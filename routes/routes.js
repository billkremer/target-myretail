module.exports = function (app) {
  const https = require("https");
  const Product = require('../model/product');


  app.get('/products/:product_id', function (req, res) {
    let product_id = req.params.product_id;

    if (parseInt(product_id) != product_id) {
      res.status('404').send( { "error": 'Product Id: ' + product_id + ' is not a valid id.'} );
      return;
    } // input validation -- makes sure the input product_id string is equivalent to an integer

    let product_info = [];

    // get the info then send
    (async () => {
      product_info = await getProductInfo(product_id);

      if (typeof product_info.error == 'string' ) {
        res.status(404).send(product_info);
        return;
      } // if an error exists

      let product_to_send = {
        "id": product_id,
        "name": product_info[0],
        "current_price": product_info[1]
      }; // reorders the parameters as requested by client

      res.send(product_to_send);
      return;
    })();
    
  }); // end of get


  async function getProductInfo(product_id) {
    let gotName = true;
    let gotPrice = true;
    let productNEWname = await getProductName(product_id)
      .catch(() => gotName = false);
    if (!gotName) { 
      return { "error": "Name information is missing" }; 
    }; // early return if name is missing

    let productNEWprice = await getProductPrice(product_id)
      .catch(() => gotPrice = false);
    if (!gotPrice) {
      return { "error": "Price information is missing" }; 
    }; // early return if price is missing

    return [productNEWname.product_description.title, productNEWprice];
  };


  // get name from redsky API
  let getProductName = function (product_id) {
    var body = '';
    let url = "https://redsky.target.com/v2/pdp/tcin/" + product_id + "?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics,available_to_promise_network,deep_red_labels,esp";

    // https://www.valentinog.com/blog/http-requests-node-js-async-await/
    // https://javascript.info/async-await
    let product_name_promise = new Promise((resolve, reject) => {
      https.get(url, (res) => {
        res.setEncoding("utf8");
        res.on("data", (data) => {
          body += data;
        });
        res.on("end", () => {
          try {
            body = JSON.parse(body);
            if (typeof body.product.item.product_description == 'undefined') {
              reject(new Error('item name not found'));
            } else {
              resolve(body.product.item);
            }
          } catch (e) {
            reject(new Error(e.message));
          };
        });
      });
    }); // end of product_name_promise

    return product_name_promise;
  };


  // get price info from db
  let getProductPrice = function (product_id) {
    let product_price_promise = new Promise((resolve, reject) => {
      Product.findOne({ id: product_id }, 'id current_price -_id', function (err, product) {
        if (err) {
          reject(new Error('500 db error'));
        };
        if (product == null) {
          reject(new Error('404 Product: ' + product_id + ' price info not found.'));
        } else {
          resolve(product.current_price);
        }; // null == undefined
      });
    });
    return product_price_promise;
  }
    

  app.put('/products/:product_id', function (req, res) {
    var product_id = req.params.product_id;
    if (parseInt(product_id) != product_id) {
      res.status('404').send({ "error": 'Product Id: ' + product_id + ' is not a valid id.' });
      return;
    } // input validation -- makes sure the input product_id string is equivalent to an integer

    // ensure id in route == id in body)
    if (product_id != req.body.id) {
      res.status('404').send({ "error": 'Product Id mismatch.' });
      return;
    };

    // ensure all parts of sent, id, name, price info (id is checked via route parameter)
    if (typeof req.body.name == 'undefined' || 
        typeof req.body.current_price == 'undefined' ||
        typeof req.body.current_price.value == 'undefined' ||
        typeof req.body.current_price.currency_code == 'undefined') {
      res.status('404').send({ "error": 'Product information is incomplete.' });
      return;
    };

    // compare name in PUT body to redsky API
    (async () => {
      product_name = await getProductName(product_id);

      if (typeof product_name.error == 'string') { // if an error exists
        res.status(404).send(product_name); 
        return;
      } else { 
        if (product_name.product_description.title == req.body.name) {
          // Product Schema has 'unique' product id so can do this.
          // https://mongoosejs.com/docs/api.html#query_Query-findOneAndUpdate
          Product.findOneAndUpdate({ id: product_id }, { "current_price.value": req.body.current_price.value }, function (err, product) {
            if (err) {
              res.sendStatus(500);
              return;
            }
            res.send({ success: 'Product price changed from: ' + product.current_price.value + ' to: ' + req.body.current_price.value});
            return;
          });
        } else {
          res.status(404).send({ error: 'Product name mismatch.' });
          return;
        };
      };       
    })();
  }); // end of PUT route




  // this is a secret route to populate the database
  app.post('/secret/newproducts/:p', function (req, res) {
    // TODO use .dotenv package to use a .env here
    // TODO -- see TODO below.  consider rewriting to do a simple look first, then save if not present.
    if (req.params.p !== 'thisisanexcellentroute') {
      res.status(401).send('Unauthorized');
      return;
    }

    var newProd = [];
    newProd[0] = new Product({
      "id": 13860428,
      // "name": "The Big Lebowski (Blu-ray) (Widescreen)",
      "current_price": {
        "value": 13.49,
        "currency_code": "USD"
      }
    });
    // { "id": 13860428, "name": "The Big Lebowski (Blu-ray) (Widescreen)", "current_price": { "value": 13.49, "currency_code": "USD" } }
    // https://www.target.com/p/the-big-lebowski-blu-ray/-/A-13860428

    newProd[1] = new Product({
      "id": 53256681,
      // "name": "Strider 14x Sport Balance Bike + Easy - Ride Pedal Kit - Green",
      "current_price": {
        "value": 189.99,
        "currency_code": "USD"
      }
    });
    // https://www.target.com/p/strider-14x-sport-balance-bike-easy-ride-pedal-kit-green/-/A-53256681

    newProd[2] = new Product({
      "id": 51301099,
      // "name": "LEGO Creator Mighty Dinosaurs 31058 Build It Yourself Dinosaur Set, Pterodactyl, Triceratops, T Rex Toy",
      "current_price": {
        "value": 11.99,
        "currency_code": "USD"
      }
    });
    // https://www.target.com/p/lego-creator-mighty-dinosaurs-31058-build-it-yourself-dinosaur-set-pterodactyl-triceratops-t-rex-toy/-/A-51301099

    newProd[3] = new Product({
      "id": 52943137,
      // "name": "So You Want to Talk About Race -  by Ijeoma Oluo (Hardcover)",
      "current_price": {
        "value": 18.36,
        "currency_code": "USD"
      }
    });
    // https://www.target.com/p/so-you-want-to-talk-about-race-by-ijeoma-oluo-hardcover/-/A-52943137

    newProd[4] = new Product({
      "id": 52997343,
      // "name": "Hidden Figures : The American Dream and the Untold Story of the Black Women Mathematicians Who Helped",
      "current_price": {
        "value": 22.48,
        "currency_code": "USD"
      }
    });
    // https://www.target.com/p/hidden-figures-the-american-dream-and-the-untold-story-of-the-black-women-mathematicians-who-helped/-/A-52997343

    newProd[5] = new Product({
      "id": 52091946,
      // "name": "LEGO&#174; Friends Sunshine Catamaran 41317",
      "current_price": {
        "value": 69.99,
        "currency_code": "USD"
      }
    });
    // https://www.target.com/p/lego-174-friends-sunshine-catamaran-41317/-/A-52091946

    newProd[6] = new Product({
      "id": 51004752,
      // "name": "T-Rex Cookie Jar Stoneware Matte White - Threshold&#153;",
      "current_price": {
        "value": 19.99,
        "currency_code": "USD"
      }
    });
    // https://www.target.com/p/t-rex-cookie-jar-stoneware-matte-white-threshold-153/-/A-51004752

    newProd[7] = new Product({
      "id": 51143245,
      // "name": "Prince - Prince (Vinyl)",
      "current_price": {
        "value": 18.98,
        "currency_code": "USD"
      }
    });
    // https://www.target.com/p/prince-prince-vinyl/-/A-51143245



    newProd[8] = new Product({
      "id": 14756360,
      // "name": "LaCroix Sparkling Water Lemon - 8pk/12 fl oz Cans",
      "current_price": {
        "value": 3.69,
        "currency_code": "USD"
      }
    });
    // https://www.target.com/p/lacroix-sparkling-water-lemon-8pk-12-fl-oz-cans/-/A-14756360

    newProd[9] = new Product({
      "id": 50480469,
      // "name": "TCL 55\" Roku 4K UHD HDR Smart TV (55S425)",
      "current_price": {
        "value": 329.99,
        "currency_code": "USD"
      }
    });
    // https://www.target.com/p/tcl-55-roku-4k-uhd-hdr-smart-tv-55s425/-/A-50480469

    newProd[10] = new Product({
      "id": 50939781,
      // "name": "TCL 65\" Roku 4K UHD HDR Smart TV (65S425)",
      "current_price": {
        "value": 499.99,
        "currency_code": "USD"
      }
    });
    // https://www.target.com/p/tcl-65-roku-4k-uhd-hdr-smart-tv-65s425/-/A-50939781

    newProd[11] = new Product({
      "id": 54082168,
      // "name": "Nintendo Switch Pikachu & Eevee Edition with Pokemon: Let's Go Pikachu! Bundle",
      "current_price": {
        "value": 399.99,
        "currency_code": "USD"
      }
    });
    // https://www.target.com/p/nintendo-switch-pikachu-eevee-edition-with-pokemon-let-s-go-pikachu-bundle/-/A-54082168


    var prod_ids = [];
    let errors = [];
    for (let element of newProd) {
      let gotPrice = true;
      (async () => {
        let productNEWprice = await getProductPrice(element.id)
          .then(() => { gotPrice = true; })
          .catch(() => { gotPrice = false; });
        if (gotPrice) {
          return { "error": "already present" }; // early return if price is already there
        } else {
          try {
            await element.save();
            //     let value = await element.save({validateBeforeSave: true }, function (err) {
            // //   if (err) {};
            //     });
            // console.log(value, 'value')

          } catch (e) {
            console.error(e);
            await errors.push(e); // how to access later?
          }
        }; 
      })()

      prod_ids.push(element.id);

    } // end of for...of loop

    res.status(201).send({'success':'Products: ' + prod_ids.join(', ') + ' are present.'});
    return;
    
  });

  
  // catchalls for other routes
  app.all('/:x', function (req, res) {
    res.status(404).send('<p>Unfortunately the page: <strong>' + req.params.x + "</strong> cannot be found. <br/>Please review the documentation.</p>");
    return;
  })
  app.all('*', function (req, res) {
    res.status(404).send('<p>Unfortunately the page cannot be found. <br/>Please review the documentation.</p>');
    return;
  })

  

}
