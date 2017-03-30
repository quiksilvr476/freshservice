const FSconfig = require('../../configs/freshservice')
const https = require('https');

// What page to poll the FreshService API to keep getting an additional 50 assets
let page = 1;
let pageExists = true;
let assets = [];

// Get a list of all the Assets in FreshService
const getAllAssets = (page) => {

	return new Promise ((resolve, reject) => {

		// Check if the page exists - pages with no data are considered false
		if (pageExists) {
			
			// Get 50 items from Service
			return getAssetsFromFreshService(page)
			.then(pageOfAssets => {
			
				// Check if there are results.  If it's empty consider the Promise resolved
				if (pageOfAssets.length <= 0) { 
					pageExists = !pageExists
					resolve(assets)
				} else {

					// Else push the assets into the aray bucket
					assets.push(pageOfAssets)
					page++
					return getAllAssets(page)
				}
			})
			.catch(error => {
				pageExists = !pageExists
				console.error(`something bad happened ${error}`)
				reject(e)
			})
		}
	})
}

// Get a list of all the Assets in FreshService one page (50 items) at time
const getAssetsFromFreshService = (page) => {
	
	return new Promise((resolve, reject) => {

		let options = {
			hostname: FSconfig.freshservice.url,
			path: `/cmdb/items.json?page=${page}`,
			auth: FSconfig.freshservice.key,
			method: 'GET',
			headers: FSconfig.freshservice.headers
		}

		let req = https.request(options, (res) => {
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
	})
}

exports.getAssets = () => {
	return getAllAssets(page)
	.then(assets => assets)
	.catch(err => console.error(err))
}