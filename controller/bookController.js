const express = require('express')
  , router = express.Router()
  , Book = require('../model/book')
  , multer  = require('multer')
  , storage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, 'uploads/books/')
		},
		filename: function (req, file, cb) {
			cb(null, file.originalname); //Не безопасно
		}
	})
  , upload = multer({ storage: storage });


router.post('/book/create', upload.array('image'),  async (req, res) => {

	if (await Book.create(Object.assign(req.body, {image: req.files[0].filename}))){
		res.send('record created')
	}else{
		res.send('error saving book')
	}

});

router.get('/book/count', async (req, res) => {

	res.json(await Book.count());

});

module.exports = router;