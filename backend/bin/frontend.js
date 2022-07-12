const http = require('http')
const fs = require('fs')

const PORT = 8001

const server = http.createServer((req, res) => {
  let pathname = req.url
  if (pathname === '/') {
    fs.readFile('./frontend/index.html', (err, data) => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')
      if (!err) {
        res.end(data)
        return
      }
      res.end('html not found')
    })
  } else if (pathname.includes('/static/')) {
    fs.readFile('./frontend' + pathname, (err, data) => {
      if (!err) return res.end(data)
      res.end('resource not found')
    })
  }
})

server.listen(PORT, () => {
  console.log(`listening on ${PORT} port`)
})
