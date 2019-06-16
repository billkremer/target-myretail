# myRetail
This is a quick and handy API for getting basic information about a product by using it's id number. 
 

### Author:
Bill Kremer

### Technology Used:
MongoDB, Express, Node

### Publication Date:
June 12, 2019

### URL:
https://myre-tail.herokuapp.com/


<!-- does PUT need to verify name? what is actual input for PUT -->

### JSON Results Format:
#### Working Example
All 
{ "id":"51143245",
  "name":"Prince - Prince (Vinyl)",
  "current\_price":{"value":18.98,"currency\_code":"USD"}
  }

#### Non-working Example:
If information is missing, json will have an "error" 
{"error":"Price information is missing"}

### Links to Examples

#### Working Examples
* https://myre-tail.herokuapp.com/products/13860428
* https://myre-tail.herokuapp.com/products/53256681
* https://myre-tail.herokuapp.com/products/51301099
* https://myre-tail.herokuapp.com/products/52943137
* https://myre-tail.herokuapp.com/products/52997343
* https://myre-tail.herokuapp.com/products/52091946
* https://myre-tail.herokuapp.com/products/51004752
* https://myre-tail.herokuapp.com/products/51143245
* https://myre-tail.herokuapp.com/products/14756360
* https://myre-tail.herokuapp.com/products/50480469
* https://myre-tail.herokuapp.com/products/50939781
* https://myre-tail.herokuapp.com/products/54082168


#### Non-working Examples
* https://myre-tail.herokuapp.com/products/13860428a ID not a valid id.
* https://myre-tail.herokuapp.com/products/13860428a1 ID not a valid id.
* https://myre-tail.herokuapp.com/products/15117729 Name information is missing
* https://myre-tail.herokuapp.com/products/16483589 Name information is missing
* https://myre-tail.herokuapp.com/products/47717069 Price information is missing
* https://myre-tail.herokuapp.com/products/76193181 Price information is missing



todos:
* handle errors when duplicate ids are in POST route
* complete PUT route
