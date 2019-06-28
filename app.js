const express = require('express')
  , app = express()
  , bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Controllers
app.use(require('./controller/bookController'));
app.use(require('./controller/fileController'));

//Start app
app.listen(3001, function() {
	console.log('Listening on port 3001...')
});