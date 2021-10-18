const get = (id) => document.getElementById(id)

let postsEl = document.getElementById('posts')
let formEl = document.getElementById("new-post")
let postsArr = []



function renderPosts(){
  let html = ""
  for (const item of postArr){
    if (item.title.length < 30){
      html += `
      <div class = "post-block">
        <h3>${item.title}</h3>
        <p>${item.body.slice(0, 100)}...
        <a class="blogpost-links" href="#">continue reading</a>
      </div>`
    }
  }
  postsEl.innerHTML = html
}

formEl.addEventListener('submit', event =>{
  event.preventDefault()
  let formData = new FormData(event.target)
  fetch("https://apis.scrimba.com/jsonplaceholder/todos",
    { method: "POST",
      body: JSON.stringify({
             title: formData.get('text-title'),
             body: formData.get('text-body'),
           }),
      headers: {
        'Content-Type': 'application/json'
      }
  }).then(response => response.json())
    .then(data => {
      postArr.unshift(data)
      renderPosts()
    })
    formEl.reset()
})

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
  .then(response => response.json())
  .then(data =>{
    postArr = data.slice(0, 10)
    renderPosts()
  })
