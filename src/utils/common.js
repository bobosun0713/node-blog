function setCookie(cookie) {
  if (!cookie) return {}
  const cookies = {}
  cookie.split(';').forEach((item) => {
    const arr = item.split('=')
    const key = arr[0].trim()
    const val = arr[1].trim()
    cookies[key] = val
  })
  return cookies
}

function setCookieExpires() {
  const date = new Date()
  date.setTime(date.getTime() + 24 * 60 * 60 * 1000)
  return date.toUTCString()
}

module.exports = {
  setCookie,
  setCookieExpires,
}
