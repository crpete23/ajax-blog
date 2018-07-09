
function populatePostList({posts}){
  console.log(posts)
  const list = document.querySelector('.post-list')
  const lis = posts.map(post => `<a href="#/posts/${post.id}" class="list-group-item list-group-item-action">${post.title}</a>`)

  list.innerHTML = lis.join(' ')
}

function populatePost(post){
  const post =
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

content.innerHTML = post;
}

module.exports = {
  populatePostList
}
