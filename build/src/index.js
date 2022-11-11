"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const mysql_1 = __importDefault(require("mysql"));
const myConnection = require('express-myConnection');
const app = (0, express_1.default)();
app.use(express_1.default.json());
//settings
app.set('port', process.env.PORT || 3000);
//middelwares
app.use((0, morgan_1.default)('dev'));
app.use(myConnection(mysql_1.default, {
    host: 'localhost',
    user: 'root',
    password: 'temporal',
    port: 3306,
    database: 'lapso'
}, 'single'));
app.listen(app.get('port'), () => {
    console.log(`server on port 3000`);
});
app.get('/', (_req, res) => res.send('welcome to nodejs app using typescript'));
// const mysql = require('mysql');
// // create the connection to database
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'lapso',
//   password: 'temporal',
// });
// connection.connect(function (error: any)
//  {
//   if (error) {
//     throw error;
//   } else {
//     console.log('conexión exitosa');
//   }
// });
// connection.end();
