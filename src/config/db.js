let MYSQL_CONFIG
let REDIS_CONFIG

if (process.env.NODE_ENV === 'dev') {
  MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: '12345678',
    port: 3306,
    database: 'myBlog',
  }

  REDIS_CONFIG = {
    port: 6379,
    host: '127.0.0.1',
  }
} else {
  MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: '12345678',
    port: 3306,
    database: 'myBlog',
  }

  REDIS_CONFIG = {
    port: 6379,
    host: '127.0.0.1',
  }
}

module.exports = {
  MYSQL_CONFIG,
  REDIS_CONFIG,
}
