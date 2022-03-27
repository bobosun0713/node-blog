const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
  let sql = `select * from blog where 1=1 `
  if (author) sql += `and author='${author}'`
  if (keyword) sql += `and title like '%${keyword}%'`
  sql += `order by createtime desc;`
  return exec(sql)
}

const getDetail = (id) => {
  const sql = `select * from blog where id='${id}';`
  return exec(sql)
}

const addBlog = (blogData = {}) => {
  const { title, content, author } = blogData
  const createTime = Date.now()
  const sql = `insert into blog (title,content,createtime,author)
  values ('${title}', '${content}' , ${createTime} , '${author}');
  `
  return exec(sql)
}

const updateBlog = (id, blogData = {}) => {
  const { title, content } = blogData
  const sql = `update blog set title='${title}', content='${content}' where id='${id}';`
  return exec(sql).then((updateData) => {
    if (updateData.affectedRows > 0) {
      return true
    }
    return false
  })
}

const delBlog = (id, author) => {
  const sql = `delete from blog where id='${id}' and author='${author}';`
  return exec(sql).then((deleteData) => {
    if (deleteData.affectedRows > 0) {
      return true
    }
    return false
  })
}

module.exports = {
  getList,
  getDetail,
  addBlog,
  updateBlog,
  delBlog,
}
