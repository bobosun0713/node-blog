const redis = require('redis')
const { REDIS_CONFIG } = require('../config/db')

const redisServer = redis.createClient({
  legacyMode: true,
  socket: REDIS_CONFIG,
})
redisServer.connect()

redisServer.on('error', (err) => {
  console.error(err)
})

function set(key, val) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisServer.set(key, val)
}

function get(key) {
  return new Promise((resolve, reject) => {
    redisServer.get(key, (err, val) => {
      if (err) {
        reject(err)
      }
      if (val === null) {
        resolve(null)
      }

      try {
        resolve(JSON.parse(val))
      } catch (e) {
        resolve(val)
      }
    })
  })
}

module.exports = {
  redisServer,
  set,
  get,
}
