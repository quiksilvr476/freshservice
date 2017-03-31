const DellConfig = require('../../configs/dell')
const https = require('https');

// Check if Dell is the Vendor
const checkVendor = (assets) => {
	
	const isDell = (assets) => {
		return assets.levelfield_values.vendor_4000679286 == DellConfig.dell.dell_vendor_id
	}

	return new Promise((resolve, reject) => {
		
		// Iterate over all assets
		resolve(assets.filter(isDell))
	})
}

// Call the Dell API and get the expiration date for the service tag
const getExpirationDate = (serviceTag) => {
	
	return new Promise((resolve, reject) => {

		let options = {
			hostname: DellConfig.dell.url,
			//path: `/projects/${uid}/issues`,
			//auth: PG_config.plangrid.key,
			method: 'GET',
			//headers: PG_config.plangrid.headers
		};

    let req = https.request(options, (res) => {
      let data = '';

      res.setEncoding('utf8');
      res.on('data', (chunk) => { data += chunk });
      res.on('end', () => {
        let jsonAsset = JSON.parse(data);
        console.log(`retreiving ${jsonAsset.length}`)
        resolve(jsonAsset);
      });
    });

    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
      reject(e);
    });

    req.end();
  });
}

exports.getExpirationDates = (assets) => {
	checkVendor(assets)
	.then(dellAssets => {

		// Get the Expiration Date of one Dell Asset by its Service Tag
		const serviceTags = dellAssets.map(asset => asset.levelfield_values.serial_number_4000679286)
		return serviceTags
	})
	.then(serviceTags => {
		serviceTags.forEach(tag => getExpirationDate(tag))
	})
	.catch(err => console.error(err))
}