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

  const eachLink = document.querySelectorAll('.list-group-item') //selects all of the post items in the side bar
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
                        <a class="nav-link" id="edit-post" name="${post.id}">Edit</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link text-danger" id="delete-post" name="${post.id}">Delete</a>
                      </li>
                    </ul>
                  </aside>
                </section>`;
    const content = document.querySelector('#content')
    content.innerHTML = update;

    const deleteButton = document.querySelector('#delete-post')
    const delID = deleteButton.getAttribute("name")
    deleteButton.addEventListener("click", function(){
      const delURL = `${URL}${delID}`
      return axios.delete(delURL).then(function(result) {
         console.log(result)
         return renderPage()
      })
    })
    })
  })

  const content = document.querySelector('#content')
  content.innerHTML = ''; //clears the content portion after a new post has been made or site has been re-rendered
}

module.exports = {
  populatePostList,
  renderPage
}
