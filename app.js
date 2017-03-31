const FSconfig = require('./configs/freshservice')
const Assets = require('./controllers/assets/getAllAssets.js');
const Dell = require('./controllers/dell/getWarranty');

// Get all the Assets in FreshService
Assets.getAssets()
.then(assets => {
	Dell.getExpirationDates(assets)
})
.catch(err => console.error(err))
