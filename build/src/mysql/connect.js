"use strict";
// // get the client
// const mysql = require('mysql2');
// // create the connection to database
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'lapso',
//   password: 'temporal'
// });
// //simple query
// connection.query(
//   'SELECT * FROM user WHERE username = Pepito',
//   function(err, results, fields) {
//     console.log(results); // results contains rows returned by server
//     console.log(fields); // fields contains extra meta data about results, if available
//   }
// );
// // with placeholder
// connection.query(
//   'SELECT * FROM user',
//   function(err, results) {
//     console.log(results);
//   }
// );
// get the client
// const mysql = require('mysql2');
// // Create the connection pool. The pool-specific settings are the defaults
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   database: 'lapso',
//   password: 'temporal',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });
const mysql = require('mysql');
// // create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'lapso',
    password: 'temporal',
});
connection.connect(function (error) {
    if (error) {
        throw error;
    }
    else {
        console.log('conexión exitosa');
    }
});
connection.end();
