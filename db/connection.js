// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    // localhost equiv for mac = 127.0.0.1 if needed
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'employees'
});

connection.connect(function (err) {
    if (err) consolo.info(err);
})

module.exports = connection