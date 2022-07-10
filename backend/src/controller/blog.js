const { readFile, writeFile } = require('../utils/file')

const getList = () => {
  return readFile('./backend/src/db/', 'blog.json')
}

const addBlog = async (blogData = {}) => {
  const updateFile = JSON.parse(await readFile('./backend/src/db/', 'blog.json'))
  blogData.id = updateFile.blog.length + 1
  updateFile.blog.push(blogData)
  return writeFile('./backend/src/db/', 'blog.json', updateFile)
}

const updateBlog = async (id, blogData = {}) => {
  const updateFile = JSON.parse(await readFile('./backend/src/db/', 'blog.json'))
  const findIndex = updateFile.blog.findIndex((item) => item.id === Number(id))
  Object.assign(updateFile.blog[findIndex], blogData)
  return writeFile('./backend/src/db/', 'blog.json', updateFile)
}

const delBlog = async (id) => {
  const updateFile = JSON.parse(await readFile('./backend/src/db/', 'blog.json'))
  const findIndex = updateFile.blog.findIndex((item) => item.id === Number(id))
  updateFile.blog.splice(findIndex, 1)
  return writeFile('./backend/src/db/', 'blog.json', updateFile)
}

module.exports = {
  getList,
  addBlog,
  updateBlog,
  delBlog,
}
