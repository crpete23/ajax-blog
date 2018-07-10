const URL = 'https://mysterious-taiga-32819.herokuapp.com/posts/'
const populate= require('./populate-posts.js')
const forms = require('./form-actions.js')

window.onload = function(){
  return populate.renderPage()
}

//create new post button
const buttonNewPost = document.querySelector('.btn-primary')
buttonNewPost.addEventListener('click', forms.populateForm)
