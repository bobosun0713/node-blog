const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog.js')

const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      return resolve({})
    }
    if (req.headers['content-type'] !== 'application/json') {
      return resolve({})
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
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')

  //* Query
  const url = req.url
  req.path = url.split('?')[0]
  req.query = querystring.parse(url.split('?')[1])

  getPostData(req).then(async (data) => {
    req.body = data

    //* BLOG
    try {
      const blogResult = await handleBlogRouter(req, res)
      if (blogResult) return res.end(JSON.stringify(blogResult))
    } catch (e) {}

    //* 404
    res.writeHead(404, { 'Content-type': 'application/json' })
    res.write('404 Not Found\n')
    res.end()
  })
}

module.exports = serverHandle
