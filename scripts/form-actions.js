const populate= require('./populate-posts.js')

function populateForm(){
  const form =
  `<form id="post-form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title" value="">
      </div>
      <div class="form-group">
        <label for="title">Content</label>
        <textarea type="text" rows="6" class="form-control" id="content"></textarea>
      </div>
      <button type="submit" class="btn btn-info btn-large">Create New Post</button>
    </form>`;
const content = document.querySelector('#content')

content.innerHTML = form;

const submitButton = document.querySelector('button')
submitButton.addEventListener('click', submitNewPost)
}

function submitNewPost(event){
  event.preventDefault();
  const titleBox = document.querySelector('input[id="title"]')
  const title = titleBox.value
  const contentBox = document.querySelector('textarea[id="content"]')
  const content = contentBox.value

  if(title.trim()===""||content.trim()==="") {

    titleBox.classList.add('error');
    contentBox.classList.add('error');

// remove the class after the animation completes
    setTimeout(function() {
      titleBox.classList.remove('error');
      contentBox.classList.remove('error');
    }, 300);

  } else {
    return axios.post('https://mysterious-taiga-32819.herokuapp.com/posts/', {
      title, content
    }).then(function(result) {
       console.log(result)
       return populate.renderPage()
    })
  }
}

module.exports = {
  populateForm
}
