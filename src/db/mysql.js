const mysql = require('mysql')
const { MYSQL_CONFIG } = require('../config/db')

const SQL = mysql.createConnection(MYSQL_CONFIG)
SQL.connect()

function exec(sql) {
  return new Promise((resolve, reject) => {
    SQL.query(sql, (err, result) => {
      if (err) {
        reject(err)
      }
      resolve(result)
    })
  })
}

module.exports = {
  exec,
}
