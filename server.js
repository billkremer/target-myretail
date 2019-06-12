var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes/routes.js');
var mongoose = require('mongoose');
// var product = require('./routes/product'); // needed in routes?

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app); // call the routes and send the app.

/** --- MONGOOSE CONNECTION --- **/
var mongo_uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/myretail'
mongoose.connect(mongo_uri, { useNewUrlParser: true });

mongoose.connection.on('connected', function () {
  console.log('Sweet connected to database', mongo_uri);
});

mongoose.connection.on('error', function () {
  console.log('Bad not connected to database', mongo_uri);
});

// /** -- ROUTES -- **/
// app.use(express.static('public'));
// app.use('/product', product);

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'public', 'views', 'index.html'));
// });

app.set('port', process.env.PORT || 3000); // use the .env file if present

app.listen(app.get('port'), function (req, res) {
  console.log('Now listening on port:', app.get('port'), "\nuse Ctrl+C to quit");
});