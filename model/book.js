const db = require('../db');

exports.create = async (book) => {
	try {
		await db.query(`
			INSERT INTO books (title, date, author, description, image) 
			VALUES (
				"${ book.title }",
				"${ book.date }",
				"${ book.author }",
				"${ book.description }",
				"${ book.image }"
				)
		`);
		return true;

	} catch (e){
		console.log(e);
		return false;
	}

};

exports.count = async () => {
	const [rows, fields] = await db.query(`SELECT COUNT(*) AS booksCount FROM books LIMIT 1;`);
	return rows[0].booksCount;
};

