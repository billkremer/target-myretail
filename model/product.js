// Product schema and model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  id: Number,
  name: String,
  current_price: { value: Number, 
                   currency_code: String }
});

var Product = mongoose.model('Product', ProductSchema);

module.exports = Product;


// { "id": 13860428, "name": "The Big Lebowski (Blu-ray) (Widescreen)", "current_price": { "value": 13.49, "currency_code": "USD" } }