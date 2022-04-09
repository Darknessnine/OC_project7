const mysql = require("mysql");

let dbConfig = ({
  host     : 'localhost',
  user     : 'Mintgreen',
  password : 'Redsky123!',
  port     : '3306',
  database : 'project7_db',
  multipleStatements: true
});

let connection = mysql.createConnection(dbConfig);

connection.connect(function(err) {
  if (err) {
    console.error('Database failed to connect: ' + err.stack);
    return;
  }
  console.log('Connected to database!');
});

module.exports = connection
