require('dotenv').config()

module.exports = {
	"freshservice": {
		"url": process.env.FRESHSERVICE_URL,
		"key": process.env.FRESHSERVICE_KEY,
		"headers": { "Accept": "application/json;" },
		"rate_limit": "1000",
		"dell_vendor_id": 4000255518
    }
};