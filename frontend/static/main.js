const baseUrl = ''

const formTitle = document.querySelector('#title')
const formTextarea = document.querySelector('#textarea')
const addBtn = document.querySelector('#addBtn')
const blogList = document.querySelector('.blog-list')

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
}

function postArgs() {
  return {
    title: formTitle.value,
    message: formTextarea.value,
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

async function updateList(id) {
  try {
    const res = await fetch(`${baseUrl}/api/blog/update?id=${id}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(postArgs()),
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
    res.blog.forEach((item) => {
      html += `  
      <div class="card">
        <div class="card-header">
          <h2>${item.title}</h2>
          <div class="card-control">
            <button data-edit onclick="${updateList(item.id)}">修改</button>
            <button data-del onclick="${deleteList(item.id)}">刪除</button>
          </div>
        </div>
        <div class="card-body">
         
         ${item.content}
         
        </div>
      </div>`
    })
    blogList.innerHTML = '123'
  } catch (error) {
    alert(error)
  } finally {
    // cardHandler()
  }
}

function cardHandler() {
  const cardList = document.querySelectorAll('.card')
  cardList.forEach((item, idx) => {
    const editBtn = document.querySelectorAll('.card-edit')[idx]
    const delBtn = document.querySelectorAll('.card-del')[idx]
    const cardMessage = document.querySelectorAll('.card-body')[idx]
    const cardEditMessage = document.querySelectorAll('.card-body-edit')[idx]

    item.addEventListener('click', function (el) {
      if (el.target === editBtn) {
        if (editBtn.innerHTML === '關閉修改') {
          editBtn.innerHTML = '修改'
          delBtn.style.display = 'unset'
          cardMessage.style.display = 'block'
          cardEditMessage.style.display = 'none'
          return
        }
        editBtn.innerHTML = '關閉修改'
        delBtn.style.display = 'none'
        cardMessage.style.display = 'none'
        cardEditMessage.style.display = 'block'
        cardEditMessage.innerHTML = cardMessage.innerHTML
      }
    })
  })
}

window.onload = function () {
  addBtn.onclick = addBlog
  renderList()
}
