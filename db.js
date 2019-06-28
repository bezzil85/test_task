const mysql = require('mysql2/promise');
const dbConfig = require('./config/database');

const connection = mysql.createPool(dbConfig.databaseConfig);

module.exports = connection;

