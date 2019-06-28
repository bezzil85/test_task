const faker = require("faker/locale/en");

const mysql = require("mysql2");

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'toor',
	database: 'megasource_task'
});


connection.query(
  `CREATE TABLE IF NOT EXISTS books (
  	id INT AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    date DATE,
    author VARCHAR(63) NOT NULL,
    description TEXT,
    image VARCHAR(127) NOT NULL,
    PRIMARY KEY (id)
  )`,
  (err, results, fields) => {
	  console.log(results);
	  console.log(fields);
  }
);

for (let i = 0; i < 10; i++){
	connection.query(`
		INSERT INTO books (title, date, author, description, image) 
		VALUES (
			"${ faker.lorem.sentence() }",
			"${ new Date(faker.date.past()) }",
			"${ faker.name.findName() }",
			"${ faker.lorem.sentence() }",
			"${ faker.random.alphaNumeric(10) }.png"
			)
	`,
	  (err, results, fields) => {
		  if (err){
			  console.log(err);
		  }
	  })
}