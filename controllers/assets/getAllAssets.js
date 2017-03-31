const FSconfig = require('../../configs/freshservice')
const https = require('https');

// Get a list of all the Assets in FreshService
const getAllAssets = (page, currentAssets) => {

  return getAssetsFromFreshService(page)
    .then(pageOfAssets => {

      if (pageOfAssets.length > 0) {
        return getAllAssets(page + 1, currentAssets.concat(pageOfAssets));
      }

      return currentAssets;
    });
}

const options = (page) => ({
  hostname: FSconfig.freshservice.url,
  path: `/cmdb/items.json?page=${page}`,
  auth: FSconfig.freshservice.key,
  method: 'GET',
  headers: FSconfig.freshservice.headers
})

// Get a list of all the Assets in FreshService one page (50 items) at time
const getAssetsFromFreshService = (page) => {

  return new Promise((resolve, reject) => {

    let req = https.request(options(page), (res) => {
      let data = '';

      res.setEncoding('utf8');
      res.on('data', (chunk) => { data += chunk });
      res.on('end', () => {
        let jsonAssets = JSON.parse(data);
        console.log(`retreiving ${jsonAssets.length} items from page ${page}`)
        resolve(jsonAssets);
      });
    });

    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
      reject(e);
    });

    req.end();
  });
}

exports.getAssets = () => getAllAssets(1, [])