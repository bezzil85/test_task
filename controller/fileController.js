const express = require('express')
  , fs = require('fs-extra')
  , router = express.Router();

const text_file = `${__dirname}/../somecontainer/v1/file.txt`;

console.log(text_file);

router.post('/api/v1/file', async (req, res) => {

	try {
		if (req.body.data){
				await fs.ensureFile(text_file);
				await fs.appendFile(text_file, '\n' + req.body.data);
		}
		if (req.query.text){
			const file_data = await fs.readFile(text_file, 'utf8');
			return res.json(file_data.split('\n').filter(string => string.toLowerCase().includes(req.query.text.toLowerCase())));

		}else{
			return res.send(await fs.readFile(text_file, 'utf8'));
		}
	} catch (e){
		console.log(e);
		return res.json({status: "error"});
	}
});

module.exports = router;