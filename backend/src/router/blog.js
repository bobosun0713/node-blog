const { getList, addBlog, updateBlog, delBlog } = require('../controller/blog.js')
const { SuccessModel, ErrorModel } = require('../model/resModel.js')

const handleBLogRouter = async (req, res) => {
  const method = req.method
  const id = req.query.id

  if (method === 'GET' && req.path === '/api/blog/list') {
    try {
      console.log('Call: /api/blog/list')
      const { blog } = JSON.parse(await getList())
      return new SuccessModel(blog, 'Blog取得成功')
    } catch (e) {
      return new ErrorModel('Blog資料取得失敗')
    }
  }

  if (method === 'POST' && req.path === '/api/blog/add') {
    try {
      console.log('Call: /api/blog/add')
      const result = await addBlog(req.body)
      return new SuccessModel({ id: insertId })
    } catch (e) {
      return new ErrorModel('Blog新增失敗')
    }
  }

  if (method === 'POST' && req.path === '/api/blog/update') {
    console.log('Call: /api/blog/update')
    const result = await updateBlog(id, req.body)
    if (result) return new SuccessModel()
    else return new ErrorModel('Blog更新失敗')
  }

  if (method === 'POST' && req.path === '/api/blog/del') {
    console.log('Call: /api/blog/del')
    const result = await delBlog(id)
    if (result) {
      return new SuccessModel()
    } else {
      return new ErrorModel('Blog刪除失敗')
    }
  }
}

module.exports = handleBLogRouter
