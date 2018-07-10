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
                    <p id='post-content'>${post.content}</p>
                  </article>
                  <aside>
                    <ul class="nav">
                      <li class="nav-item">
                        <a class="nav-link" id="edit-post" href="#/posts/${post.id}/edit" name="${post.id}">Edit</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link text-danger" href="#" id="delete-post" name="${post.id}">Delete</a>
                      </li>
                    </ul>
                  </aside>
                </section>`;
    const content = document.querySelector('#content')
    content.innerHTML = update;

   deleteSetAction()
   changeSetAction()
    })
  })

  const content = document.querySelector('#content')
  content.innerHTML = ''; //clears the content portion after a new post has been made or site has been re-rendered
}

function deleteSetAction(){
  const deleteButton = document.querySelector('#delete-post')
  const delID = deleteButton.getAttribute("name")
  deleteButton.addEventListener("click", function(){
    const delURL = `${URL}${delID}`
    return axios.delete(delURL).then(function(result) {
       console.log(result)
       return renderPage()
    })
  })
}

function changeSetAction(){
  const editButton = document.querySelector('#edit-post')
  editButton.addEventListener("click", populateEditForm)
}

function populateEditForm(){
const title = document.querySelector('h2').textContent
const content = document.querySelector('#post-content').innerHTML
const editID = document.querySelector('#edit-post').getAttribute("name")

const form =
  `<form id="post-form>
      <div class="form-group">
        <label for="title" value=>Title</label>
        <input type="text" class="form-control" id="title" value='${title}'>
      </div>
      <div class="form-group">
        <label for="title">Content</label>
        <textarea type="text" rows="6" class="form-control" id="content">${content}</textarea>
      </div>
      <button type="submit" class="btn btn-info btn-large" name=${editID}>Update Post</button>
    </form>`;
const update = document.querySelector('#content')
update.innerHTML = form;

const submitButton = document.querySelector('button')
submitButton.addEventListener('click', editPost)
}

function editPost(event){
  event.preventDefault();
  const titleBox = document.querySelector('input[id="title"]')
  const title = titleBox.value
  const contentBox = document.querySelector('textarea[id="content"]')
  const content = contentBox.value
  const editID = document.querySelector('button').getAttribute('name')
  const editURL = URL + editID

  if(title.trim()===""||content.trim()==="") {

    titleBox.classList.add('error');
    contentBox.classList.add('error');

// remove the class after the animation completes
    setTimeout(function() {
      titleBox.classList.remove('error');
      contentBox.classList.remove('error');
    }, 300);

  } else {
    return axios.put(editURL, {
      title, content
    }).then(function(result) {
       console.log(result)
       return renderPage()
    })
  }
}


module.exports = {
  populatePostList,
  renderPage
}
