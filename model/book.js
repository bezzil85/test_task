const db = require('../db');

exports.create = async (book) => {
	try {
		await db.query(`
			INSERT INTO books (title, date, author, description${ book.image ? ', image' : '' }) 
			VALUES (
				"${ book.title }",
				"${ book.date }",
				"${ book.author }",
				"${ book.description }"
				${ book.image ? `, "${book.image}"` : "" }
				)
		`);
		return true;

	} catch (e){
		console.log(e);
		return false;
	}

};


exports.update = async (book, id)=>{
	try {
		await  db.query(`UPDATE books SET ${ Object.entries(book).map((n)=>{ 
			return `${n[0]} = "${n[1]}"`
		}).join(", ") } WHERE id=${id}`);
		return true;
	} catch (e){
		console.log(e);
		return false;

	}
};


exports.delete = async (id) => {
	try {
		await  db.query(`DELETE FROM books WHERE id=${id}`);
		return true;
	} catch (e){
		console.log(e);
		return false;
	}
};

exports.fetch = async (options) => {
	try {
		console.log(options);
		let query = `SELECT * FROM books 
		${ options.groupby ? "GROUP BY " + options.groupby : ""}
		${ options.orderby ? "ORDER BY " + options.orderby.split("_").join(" ") : ""}
		${ options.limit ? "LIMIT " + options.limit : "LIMIT 10"} 
		${ options.offset ? "OFFSET " + options.offset : ""}
		`;

		let [rows, fields] = await db.query(query);
		return rows;
	} catch (e) {
		console.log(e);
		return false;
	}
};

exports.count = async () => {
	const [rows, fields] = await db.query(`SELECT COUNT(*) AS booksCount FROM books LIMIT 1;`);
	return rows[0].booksCount;
};