const FSconfig = require('./configs/freshservice')
const allAssets = require('./controllers/assets/getAllAssets.js');

// Check if there is an existing warranty expiration
function getWarrantyExpiration(asset) {
	return asset.levelfield_values.warranty_expiry_date_4000679286 === null
}

// Check if Dell is the Vendor
function isDell(needsWarrantyAssets) {
	return needsWarrantyAssets.levelfield_values.vendor_4000679286 === FSconfig.freshservice.dell_vendor_id
}

// Get all the Assets in FreshService
allAssets.getAssets()
.then(assets => {
	console.log(`getting assets from app.js ${assets}`)
	return assets.filter(getWarrantyExpiration)  		// Filter out all Assets with an Expiration Date
})
.then(needsWarrantyAssets => {
	console.log('filtering, should be slow')
	return needsWarrantyAssets.filter(isDell)				// Filter out any non Dell equipment
})
.then(dellAssets => {
	console.log(dellAssets)
})
.catch(err => console.error(err))