const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const { setCookie, setCookieExpires } = require('./src/utils/common')

// session
const SESSION = {}

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
  res.setHeader('Content-type', 'application/json')

  // Path
  const url = req.url
  req.path = url.split('?')[0]

  // Query
  req.query = querystring.parse(url.split('?')[1])

  // 解析cookie
  req.cookie = setCookie(req.headers.cookie)

  // 解析session
  let needSetCookie = false
  let userId = req.cookie.userid
  if (userId) {
    if (!SESSION[userId]) {
      SESSION[userId] = { userId }
    }
  } else {
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    SESSION[userId] = { userId }
  }
  req.session = SESSION[userId]

  // 處理 post data
  getPostData(req).then(async (postData) => {
    req.body = postData

    //* BLOG
    try {
      const blogResult = await handleBlogRouter(req, res)
      if (needSetCookie) {
        res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${setCookieExpires()}`)
      }
      if (blogResult) return res.end(JSON.stringify(blogResult))
    } catch (e) {}

    //* User
    try {
      const userData = await handleUserRouter(req, res)
      if (needSetCookie) {
        res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${setCookieExpires()}`)
      }
      if (userData) return res.end(JSON.stringify(userData))
    } catch (e) {
      console.log('handleUserRouter error msg: ', e)
    }

    //* 404
    res.writeHead(404, { 'Content-type': 'text/plain' })
    res.write('404 Not Found\n')
    res.end()
  })
}

module.exports = serverHandle
