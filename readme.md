# myRetail
This is an end-to-end Proof-of-Concept for a products API, which will aggregate product data from multiple sources and return it as JSON to the caller.
 

### Author:
Bill Kremer

### Technology Used:
[MongoDB](https://docs.mongodb.com/manual/), [Express](http://expressjs.com/), [Node.js](https://nodejs.org),

Target Redsky API: https://redsky.target.com/v2/pdp/tcin/ + product_id

[Heroku](https://www.heroku.com/) app platform with [mLab MongoDB](https://www.mlab.com/)

### Tools Used
[Visual Studio Code](https://code.visualstudio.com/), [Robo 3T](https://www.robomongo.org), [Postman](https://www.getpostman.com/)

### Publication Date:
June 16, 2019

### URL:
https://myre-tail.herokuapp.com/


<!-- does PUT need to verify name? what is actual input for PUT -->

### JSON Results Format:
#### Working Example
All fields have data.

```
{ 
  "id": "51143245",
  "name": "Prince - Prince (Vinyl)",
  "current_price": {
    "value": 18.98,
    "currency_code": "USD"
    }
}
```

#### Non-working Example:
If information is missing, json will have an "error" field
```
{
  "error": "Price information is missing"
}
```

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
(These could change depending on the Redsky API)

### How to Run this Repo Locally:
1. `$ git clone https://github.com/billkremer/target-myretail.git`
2. `$ cd target-myretail`
3. `$ npm install`
4. Start your local MongoDB server on port 27017. `$ mongod`
5. In your [database tool](https://www.robomongo.org), [create a collection](https://docs.mongodb.com/manual/reference/method/db.createCollection/) with the name: "products" `db.createCollection('products')`
6. `$ npm start`
7. Navigate to [http://localhost:3000/products/](http://localhost:3000/products/)
8. Seed the database by a POST to the [secret route](http://localhost:3000/secret/newproducts/thisisanexcellentroute)


### To Get the Product Information 
1a\. Input working ids after the `/products/` in the URL in a web browser
OR
1b\. Use curl or Postman (or similar API Development Environment) to make a GET call to the URL with the working id after the `/products/`.

### To Update the Product Pricing
1. Use curl or Postman (or similar API Development Environment) to make a PUT call to the URL with the working id after the `/products/`. In the body of the PUT include the same information as you would get from the Product information call with an updated price.



