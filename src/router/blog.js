const { getList, getDetail, addBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const loginCheck = (req) => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel('未登錄'))
  }
}

const handleBLogRouter = async (req, res) => {
  const method = req.method
  const id = req.query.id

  if (method === 'GET' && req.path === '/api/blog/list') {
    const { author, keyword } = req.query

    try {
      const result = await getList(author, keyword)
      return new SuccessModel(result)
    } catch (e) {}
  }

  if (method === 'GET' && req.path === '/api/blog/detail') {
    try {
      const result = await getDetail(id)
      return new SuccessModel(result[0])
    } catch (e) {}
  }

  if (method === 'POST' && req.path === '/api/blog/new') {
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      return loginCheckResult
    }
    try {
      const { insertId } = await addBlog(req.body)
      return new SuccessModel({ id: insertId })
    } catch (e) {}
  }

  if (method === 'POST' && req.path === '/api/blog/update') {
    const result = updateBlog(id, req.body)
    if (result) return new SuccessModel()
    else return new ErrorModel('Blog更新失敗')
  }

  if (method === 'POST' && req.path === '/api/blog/del') {
    const result = await delBlog(id, 'bobo')
    if (result) {
      return new SuccessModel()
    } else {
      return new ErrorModel('Blog刪除失敗')
    }
  }
}
3
module.exports = handleBLogRouter
