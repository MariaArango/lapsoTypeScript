require('dotenv').config();
import mysql from 'mysql2/promise';
const {
  MY_SQL_DB_HOST,
  MY_SQL_DB_USER,
  MY_SQL_DB_PASSWORD,
  MY_SQL_DB_PORT,
  MY_SQL_DB_DATABASE,
  MY_SQL_DB_CONNECTION_LIMIT,
} = process.env;

// Create the connection pool. The pool-specific settings are the defaults
const client = mysql.createPool({
  host: MY_SQL_DB_HOST,
  user: MY_SQL_DB_USER,
  database: MY_SQL_DB_DATABASE,
  waitForConnections: true,
  connectionLimit: Number(MY_SQL_DB_CONNECTION_LIMIT),
  password: MY_SQL_DB_PASSWORD,
  port: Number(MY_SQL_DB_PORT),
  queueLimit: 0,
  Promise
});

export { client };
