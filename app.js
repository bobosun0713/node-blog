const { equal } = require('assert')
const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
    }

    let postData = ''
    req.on('data', (chunk) => {
      postData += chunk.toString()
    })

    req.on('end', () => {
      if (!postData) {
        resolve({})
      }
      resolve(JSON.parse(postData))
    })
  })
}

const serverHandle = (req, res) => {
  res.setHeader('Content-type', 'application/json')

  // Path
  const url = req.url
  req.path = url.split('?')[0]

  // Query
  req.query = querystring.parse(url.split('?')[1])

  // 處理 post data
  getPostData(req).then(async (postData) => {
    req.body = postData

    //* BLOG
    try {
      const blogResult = await handleBlogRouter(req, res)
      if (blogResult) return res.end(JSON.stringify(blogResult))
    } catch (e) {}

    //* User
    try {
      const userData = await handleUserRouter(req, res)
      if (userData) return res.end(JSON.stringify(userData))
    } catch (e) {}

    //* 404
    res.writeHead(404, { 'Content-type': 'text/plain' })
    res.write('404 Not Found\n')
    res.end()
  })
}

module.exports = serverHandle
