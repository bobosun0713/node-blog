const baseUrl = 'http://localhost:8000'

const formTitle = document.querySelector('#title')
const formTextarea = document.querySelector('#textarea')
const addBtn = document.querySelector('#addBtn')
const blogList = document.querySelector('.blog-list')

const headers = {
  // 'Content-Type': 'application/json',
  // 'Access-Control-Allow-Origin': '*',
}

function test() {
  console.log('123')
  alert('123')
}

function postArgs() {
  return {
    title: formTitle.value,
    content: formTextarea.value,
  }
}

async function addBlog() {
  if (!formTitle.value || !formTextarea.value) return alert('請輸入內容')
  try {
    const res = await fetch(`${baseUrl}/api/blog/add`, {
      method: 'POST',
      headers,
      body: JSON.stringify(postArgs()),
    })
    renderList()
  } catch {
    alert('新增失敗')
  }
}

function fetchList() {
  return fetch(`${baseUrl}/api/blog/list`, { method: 'GET', headers })
    .then((res) => {
      return res.json()
    })
    .catch((error) => {
      throw '列表讀取失敗'
    })
}

async function updateList(id, idx) {
  const cardEditMessage = document.querySelectorAll('.card-body-edit')[idx]

  try {
    const res = await fetch(`${baseUrl}/api/blog/update?id=${id}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ content: cardEditMessage.value }),
    })
    renderList()
  } catch {
    alert('列表更新失敗')
  }
}

async function deleteList(id) {
  try {
    const res = await fetch(`${baseUrl}/api/blog/del?id=${id}`, { method: 'POST', headers })
    renderList()
  } catch {
    alert('列表刪除失敗')
  }
}

async function renderList() {
  let html = ''
  try {
    const res = await fetchList()
    res.data.forEach((item, idx) => {
      html += `  
      <div class="card">
        <div class="card-header">
          <h2>${item.title}</h2>
          <div class="card-control">
            <button class="card-edit">修改</button>
            <button class="card-sure" onclick="updateList(${item.id},${idx})">確認</button>
            <button class="card-del" onclick="deleteList(${item.id})">刪除</button>
          </div>
        </div>
        <div class="card-body">
          ${item.content}
        </div>
        <textarea class="card-body-edit">
        </textarea>
      </div>`
    })
    blogList.innerHTML = html
  } catch (error) {
    alert(error)
  } finally {
    cardHandler()
  }
}

function cardHandler() {
  const cardList = document.querySelectorAll('.card')
  cardList.forEach((item, idx) => {
    const editBtn = document.querySelectorAll('.card-edit')[idx]
    const delBtn = document.querySelectorAll('.card-del')[idx]
    const sureBtn = document.querySelectorAll('.card-sure')[idx]
    const cardMessage = document.querySelectorAll('.card-body')[idx]
    const cardEditMessage = document.querySelectorAll('.card-body-edit')[idx]
    sureBtn.style.display = 'none'

    item.addEventListener('click', function (el) {
      if (el.target === editBtn) {
        if (editBtn.innerHTML === '關閉修改') {
          editBtn.innerHTML = '修改'
          delBtn.style.display = 'unset'
          sureBtn.style.display = 'none'
          cardMessage.style.display = 'block'
          cardEditMessage.style.display = 'none'
          return
        }
        editBtn.innerHTML = '關閉修改'
        delBtn.style.display = 'none'
        sureBtn.style.display = 'unset'
        cardMessage.style.display = 'none'
        cardEditMessage.style.display = 'block'
        cardEditMessage.innerHTML = cardMessage.innerHTML.trim()
      }
    })
  })
}

window.onload = function () {
  addBtn.onclick = addBlog
  renderList()
}
