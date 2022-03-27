// 配置
let MYSQL_CONFIG
if (process.env.NODE_ENV === 'dev') {
  MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: '12345678',
    port: 3306,
    database: 'myBlog',
  }
} else {
  MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: '12345678',
    port: 3306,
    database: 'myBlog',
  }
}

module.exports = {
  MYSQL_CONFIG,
}
