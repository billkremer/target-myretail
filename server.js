var express = require('express');
var routes = require('./routes/routes.js');

var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true); // fixes deprecation warning
mongoose.set('useFindAndModify', false); // fixes deprecation warning

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app); // call the routes and send the app.

// Mongoose connection to MongoDB - Local or remote
app.set('mongo_uri', process.env.MONGODB_URI || 'mongodb://localhost:27017/myretail');
mongoose.connect(app.get('mongo_uri'), { useNewUrlParser: true });

app.set('port', process.env.PORT || 3000); 

app.listen(app.get('port'), function (req, res) {
  console.log('Now listening on port:', app.get('port'), "\nIf running locally, use Ctrl+C to quit");
});