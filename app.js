const express = require('express')
  , app = express()
  , db = require('./db')
  , bodyParser = require('body-parser')
  , multer = require("multer");


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Controllers
app.use(require('./controller/bookController'));

//Start app
app.listen(3001, function() {
	console.log('Listening on port 3001...')
});