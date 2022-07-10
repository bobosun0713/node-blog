const fs = require('fs')

async function readFile(url, file) {
  return new Promise((resolve, reject) => {
    fs.readFile(url + file, (err, data) => {
      if (err) reject('Not found')
      resolve(data.toString())
    })
  })
}

function writeFile(url, file, data) {
  const writeData = JSON.stringify(data)
  return new Promise((resolve, reject) => {
    fs.writeFile(url + file, writeData, (err) => {
      if (err) reject('Write error')
    })
    resolve('done')
  })
}

module.exports = {
  readFile,
  writeFile,
}
