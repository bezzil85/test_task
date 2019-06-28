const express = require('express')
  , path = require('path')
  , router = express.Router()
  , Book = require('../model/book')
  , multer  = require('multer')
  , storage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, 'uploads/books/')
		},
		filename: function (req, file, cb) {
			cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); //Не безопасно
		}
	})
  , upload = multer({
		storage: storage
  	}).any();


router.post('/book/create', upload,  async (req, res) => {

	if (await Book.create(Object.assign(req.body, {
		image: (req.files && req.files.length ? req.files[0].filename : false)
	}))){
		res.json({'status': 'record created'});
	}else{
		res.json({'status': 'error saving record'});
	}

});

router.post('/book/update/:id', upload, async (req, res) => {

	if (await Book.update(Object.assign(req.body, {
		  image: (req.files && req.files.length ? req.files[0].filename : false)
	  }), req.params.id)){
		res.json({'status': 'record updated'});
	}else{
		res.json({'status': 'error updating record'});
	}

});


router.get('/book/delete/:id', async (req, res) => {

	if (await Book.delete(req.params.id)){
		res.json({'status': 'record deleted'});
	}else{
		res.json({'status': 'error deleting record'});
	}

});


//http://localhost:3001/book/fetch?limit=5&offset=20&orderby=id_DESC&groupby=author
//http://localhost:3001/book/fetch?limit=25
//http://localhost:3001/book/fetch?offset=100
//http://localhost:3001/book/fetch?orderby=date_DESC

router.get('/book/fetch', async (req, res) => {

	let books = await Book.fetch(req.query);
	if (books){
		res.json(books);
	}else{
		res.json([]);
	}

});


router.get('/book/count', async (req, res) => {

	res.json(await Book.count());

});

module.exports = router;