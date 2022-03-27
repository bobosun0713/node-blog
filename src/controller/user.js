const { exec } = require('../db/mysql')
const login = (name, password) => {
  const sql = `select name, real_name from user where name='${name}' and password='${password}';`
  return exec(sql).then((rows) => rows[0] || {})
}

module.exports = {
  login,
}
