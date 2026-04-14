const mysql = require('mysql2')

const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'salud_app'
})

db.connect(err => {
  if (err) throw err
  console.log('Conectado a MySQL')
})

module.exports = db
