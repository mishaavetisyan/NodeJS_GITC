const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',

  user: 'root',
  password: 'password',
  database: 'tasks_db'
})

connection.connect()

connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
  if (err)  err

  console.log('The solution is: ', rows[0].solution)
})
module.exports=connection;
// connection.end()