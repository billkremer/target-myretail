
// var express = require('express');
// var router = express.Router();
module.exports = function (app) {

var Product = require('../model/product');


app.get('/secret/newproduct/', function(req, res) {
console.log('asdf');

  var newProd = new Product({ 
    "id": 13860428, 
    "name": "The Big Lebowski (Blu-ray) (Widescreen)", 
    "current_price": { "value": 13.49, 
                       "currency_code": "USD" } 




   });

      // { "id": 13860428, "name": "The Big Lebowski (Blu-ray) (Widescreen)", "current_price": { "value": 13.49, "currency_code": "USD" } }



  newProd.save(function (err) {
    if (err) return handleError(err);
    console.log('new product saved', newProd);
  });
  res.status(201).send('Created Product: ' + newProd.product_id + '.');
  return;

})


app.get('/products/:product_id', function (req, res) {
  console.log('inapp.get', typeof req.params.product_id, parseInt(req.params.product_id) == req.params.product_id, typeof parseInt(req.params.product_id) );

  if (parseInt(req.params.product_id) != req.params.product_id) {
    res.status('404').send('Product Id: ' + req.params.product_id + ' is not valid. Please check documentation.');
    return;
  } // input validation -- makes sure the input product_id string is equivalent to an integer

  Product.findOne({ id: req.params.product_id  }, function (err, product) { 
    if (err) {
      res.sendStatus(500);
      return;
    }
    if (product == null) { 
      res.status('404').send('Product: ' + req.params.product_id + ' not found.');
      return;
    } // null == undefined
console.log(product, 'asdf');
    res.send(product);
  });

});




// @TODO: Complete this route using Person.findByIdAndUpdate
app.put('/products/:product_id', function (req, res) {
  var product_id = req.params.product_id;
  console.log('inapp.get');

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

  app.all('/:x', function (req, res) {
    res.status(404).send('<p>Unfortunately the page: <strong>' + req.params.x + "</strong> cannot be found. <br/>Please review the documentation.</p>");
    return
  })


}
