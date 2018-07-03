const { posts } = require('./data.js')
const uuid = require('uuid/v4')

function getAll(){
  return posts;
}

function get(id){
  const errors = []
  var response = posts.find(element => element.id===id)
  if (!response){
    errors.push('Specified Id was not found')
    response = {errors}
  }
   return response
}

function create(body){
  const errors = []
  const title = body.title
  const content = body.content

  let response

  if (!title||!content){
    errors.push('Title and Content are required fields')
    response = {errors}
  } else {
    const post = { id: uuid(), title, content }
    posts.push(post)
    response = post
  }
  return response
}

function change(id, body){
  const errors = []
  const title = body.title
  const content = body.content
  const post = posts.find(ele => ele.id === id)
  var flag = true
  let response

  if(!post) {
    errors.push('Unable to find specified post Id to make requested change')
    response = {errors}
    flag = false
  }
  if (!title||!conent){
    errors.push('Title and Content are required fields')
    response = {errors}
    flag = false
  }
  if (flag) {
   post.title = title
   post.content = content
   response = post
  }
  return response
  }

function remove(id){
  const errors = []
  const post = posts.find(ele => ele.id === id)

  let response

  if(!post) {
    errors.push('Unable to find specified post Id to remove')
    response = {errors}
} else {
   const index = posts.indexOf(post)
   response = posts.splice(index, 1)
}
  return response
}

module.exports = { getAll, get, create, change, remove }
