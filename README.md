### Project to integrate third party apps with FreshService

Create .env file

```  
// FreshService API Key  
FRESHSERVICE_KEY='yourAPIKeyHere'  
FRESHSERVICE_URL='yourDomainHere.FRESHSERVICE.COM'

// Dell
DELL_API_KEY='yourDellAPIKeyHere'
```

#### Dell Warranty Check via the Dell API
For the Dell Integration to work we need to identify the Vendor code in FreshService associated with Dell as we can't yet pull the Manufacturer from the FreshService API.  Unfortunately that means this only works with computers purchased directly from Dell.

1. In FreshService go to Admin > Vendors
2. Click on Dell
3. The last 10 digits of the URL will be the vendor id - https://yourdomain.freshservice.com/itil/vendors/1234567890
4. Add those digits to configs/freshservice.js like this:

```
module.exports = {
	"freshservice": {
		...
		"dell_vendor_id": PUT THEM HERE
    }
};
```

I also added a Custom Boolean Field to the Computer Asset Type called Dell Warranty Checked.  When we have successfully returned the expiration date from the Dell API (or you set the expiration date manually and then check this box) this service will no longer call the Dell API for Assets that are marked true.