const { login } = require('../controller/user')
const { set } = require('../db/redis')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = async (req, res) => {
  const method = req.method

  if (method === 'POST' && req.path === '/api/user/login') {
    const { name, password } = req.body
    const result = await login(name, password)
    if (result.name) {
      // 設置session
      req.session.name = result.name
      req.session.real_name = result.real_name

      set(req.session.userId, req.session)

      return new SuccessModel()
    }
    return new ErrorModel('登入失敗')
  }

  // 測試用
  if (method === 'GET' && req.path === '/api/user/login-test') {
    if (req.session.name) {
      return Promise.resolve(
        new SuccessModel({
          session: req.session,
        })
      )
    }

    return Promise.resolve(new ErrorModel('未登入'))
  }
}

module.exports = handleUserRouter
