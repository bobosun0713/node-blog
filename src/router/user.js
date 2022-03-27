const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = async (req, res) => {
  const method = req.method

  if (method === 'POST' && req.path === '/api/user/login') {
    const { name, password } = req.body
    const result = await login(name, password)
    if (result.name) {
      return new SuccessModel()
    }
    return new ErrorModel('登入失敗')
  }
}

module.exports = handleUserRouter
