var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit : 10,
    database : "visitors",
    user : "root",
    password : "1234",
    host : "localhost",
    multipleStatements: true
});

module.exports = pool;