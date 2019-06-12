module.exports = function (app) {

  var Product = require('../model/product');

  app.get('/products/:product_id', function (req, res) {


    if (parseInt(req.params.product_id) != req.params.product_id) {
      res.status('404').send('Product Id: ' + req.params.product_id + ' is not valid. Please check documentation.');
      return;
    } // input validation -- makes sure the input product_id string is equivalent to an integer

    Product.findOne({ id: req.params.product_id  }, 'id name current_price -_id',function (err, product) { 
      if (err) {
        res.sendStatus(500);
        return;
      }
      if (product == null) { 
        res.status('404').send('Product: ' + req.params.product_id + ' not found.');
        return;
      } // null == undefined
      res.send(product);
    });

  });




  // @TODO: Complete this route
  app.put('/products/:product_id', function (req, res) {
    var product_id = req.params.product_id;
    console.log('inapp.get', typeof req.params.product_id, parseInt(req.params.product_id) == req.params.product_id, typeof parseInt(req.params.product_id));

    console.log('id received - put', id);
    
    Product.findOneAndUpdate({id: product_id}, function (err, product) {
      if (err) {
        res.sendStatus(500);
        return;
      }
  console.log(product)
      res.sendStatus(200);
    });
  });





  // this is a secret route to populate the database
  app.get('/secret/newproducts/', function (req, res) {
    var newProd = [];
    newProd[1] = new Product({
      "id": 13860428,
      "name": "The Big Lebowski (Blu-ray) (Widescreen)",
      "current_price": {
        "value": 13.49,
        "currency_code": "USD"
      }
    });

    // { "id": 13860428, "name": "The Big Lebowski (Blu-ray) (Widescreen)", "current_price": { "value": 13.49, "currency_code": "USD" } }
    // https://www.target.com/p/the-big-lebowski-blu-ray/-/A-13860428

    newProd[1].save(function (err) {
      if (err) return handleError(err);
      console.log('new product saved', newProd);
    });


    newProd[2] = new Product({
      "id": 51301099,
      "name": "LEGO Creator Mighty Dinosaurs 31058 Build It Yourself Dinosaur Set, Pterodactyl, Triceratops, T Rex Toy",
      "current_price": {
        "value": 11.99,
        "currency_code": "USD"
      }
    });

    // https://www.target.com/p/lego-creator-mighty-dinosaurs-31058-build-it-yourself-dinosaur-set-pterodactyl-triceratops-t-rex-toy/-/A-51301099

    newProd[2].save(function (err) {
      if (err) return handleError(err);
      console.log('new product saved', newProd);
    });


    newProd[3] = new Product({
      "id": 52943137,
      "name": "So You Want to Talk About Race -  by Ijeoma Oluo (Hardcover)",
      "current_price": {
        "value": 18.36,
        "currency_code": "USD"
      }
    });

    // https://www.target.com/p/so-you-want-to-talk-about-race-by-ijeoma-oluo-hardcover/-/A-52943137

    newProd[3].save(function (err) {
      if (err) return handleError(err);
      console.log('new product saved', newProd);
    });


    newProd[4] = new Product({
      "id": 52997343,
      "name": "Hidden Figures : The American Dream and the Untold Story of the Black Women Mathematicians Who Helped",
      "current_price": {
        "value": 22.48,
        "currency_code": "USD"
      }
    });

    // https://www.target.com/p/hidden-figures-the-american-dream-and-the-untold-story-of-the-black-women-mathematicians-who-helped/-/A-52997343

    newProd[4].save(function (err) {
      if (err) return handleError(err);
      console.log('new product saved', newProd);
    });


    newProd[5] = new Product({
      "id": 52091946,
      "name": "LEGO&#174; Friends Sunshine Catamaran 41317",
      "current_price": {
        "value": 22.48,
        "currency_code": "USD"
      }
    });

    // https://www.target.com/p/lego-174-friends-sunshine-catamaran-41317/-/A-52091946

    newProd[5].save(function (err) {
      if (err) return handleError(err);
      console.log('new product saved', newProd);
    });


    newProd[6] = new Product({
      "id": 51004752,
      "name": "T-Rex Cookie Jar Stoneware Matte White - Threshold&#153;",
      "current_price": {
        "value": 19.99,
        "currency_code": "USD"
      }
    });

    // https://www.target.com/p/t-rex-cookie-jar-stoneware-matte-white-threshold-153/-/A-51004752

    newProd[6].save(function (err) {
      if (err) return handleError(err);
    });


    newProd[7] = new Product({
      "id": 51143245,
      "name": "Prince - Prince (Vinyl)",
      "current_price": {
        "value": 18.98,
        "currency_code": "USD"
      }
    });
    // https://www.target.com/p/prince-prince-vinyl/-/A-51143245

    newProd[7].save(function (err) {
      if (err) return handleError(err);
    });


    newProd[8] = new Product({
      "id": 14756360,
      "name": "aCroix Sparkling Water Lemon - 8pk/12 fl oz Cans",
      "current_price": {
        "value": 3.69,
        "currency_code": "USD"
      }
    });
    // https://www.target.com/p/lacroix-sparkling-water-lemon-8pk-12-fl-oz-cans/-/A-14756360

    newProd[8].save(function (err) {
      if (err) return handleError(err);
    });


    let prod_ids = '';
    for (let i = 1; i <= 8; i++) {
      prod_ids += newProd[i].id + ', ';
    }

    res.status(201).send('Created Products: ' + prod_ids + '.');
    return;
  })

  
  // catchall for other routes
  app.all('/:x', function (req, res) {
    res.status(404).send('<p>Unfortunately the page: <strong>' + req.params.x + "</strong> cannot be found. <br/>Please review the documentation.</p>");
    return
  })


}
