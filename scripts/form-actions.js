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
}

module.exports = {
  populateForm
}
