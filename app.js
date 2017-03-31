const FSconfig = require('./configs/freshservice')
const Assets = require('./controllers/assets/getAllAssets.js');

// Check if Dell is the Vendor
function isDell(asset) {
	return asset.levelfield_values.vendor_4000679286 == FSconfig.freshservice.dell_vendor_id
}

// Get all the Assets in FreshService
Assets.getAssets()
.then(assets => {
	console.log(`total number of assets is ${assets.length}`)
	return assets.filter(isDell)												// Filter out any non Dell equipment
})
.then(DellAssets => {
	console.log(`number of Dell devices is ${DellAssets.length}`)
	DellAssets.forEach(asset => console.log(asset.levelfield_values.dell_warranty_checked_4000679292))
})
.catch(err => console.error(err))