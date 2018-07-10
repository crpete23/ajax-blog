const URL = 'https://mysterious-taiga-32819.herokuapp.com/posts/'

function renderPage(){
  return axios.get(URL)
    .then(res => res.data.data)
    .then(populatePostList)
}

function populatePostList(posts){
  const list = document.querySelector('.post-list')
  const lis = posts.map(post => `<a name="${post.id}" href="#/posts/${post.id}" class="list-group-item list-group-item-action">${post.title}</a>`)

  list.innerHTML = lis.join(' ')

  const eachLink = document.querySelectorAll('.list-group-item')
  eachLink.forEach(function(ele) {
    const id= ele.getAttribute("name")
    const post = posts.find(obj => obj.id==id)
    ele.addEventListener("click",function(){
      const update =
      `          <section>
                  <header>
                    <h2>${post.title}</h2>
                    <hr>
                  </header>
                  <article>
                    <p>${post.content}</p>
                  </article>
                  <aside>
                    <ul class="nav">
                      <li class="nav-item">
                        <a class="nav-link" id="edit-post">Edit</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link text-danger" id="delete-post">Delete</a>
                      </li>
                    </ul>
                  </aside>
                </section>`;
    const content = document.querySelector('#content')

    content.innerHTML = update;
    })
  })
}

module.exports = {
  populatePostList,
  renderPage
}
