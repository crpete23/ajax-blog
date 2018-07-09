const posts = require('../src/models/data.js')
const populate= require('./populate-posts.js')
const forms = require('./form-actions.js')

const buttonNewPost = document.querySelector('.btn-primary')

populate.populatePostList(posts)

buttonNewPost.addEventListener('click', forms.populateForm)
