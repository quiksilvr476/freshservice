### Project to integrate third party apps with FreshService

Create .env file

```  
// FreshService API Key  
FRESHSERVICE_KEY='yourAPIKeyHere'  
FRESHSERVICE_URL='yourDomainHere.FRESHSERVICE.COM' 
```

#### Dell Warranty Check via the Dell API
For the Dell Integration to work we need to indentify the Vendor code in FreshService associated with Dell.  Unfortunealty that means this only works with computers purchased directly from Dell.

1. In FreshService go to Admin > Vendors
2. Click on Dell
3. The last 10 digits of the URL will be the vendor id - https://yourdomain.freshservice.com/itil/vendors/**1234567890**
4. Add those digits to configs/freshservice.js like this:

```
module.exports = {
	"freshservice": {
		...
		"dell_vendor_id": PUT THEM HERE
    }
};
```


