const model = require('../models/posts.js')

//Posts routes
function getAll(req,res,next){
  const data = model.getAll()
  res.status(200).json({data})
}

function getOne(req,res,next){
  const id = req.params.id
  const data = model.get(id)

  if (data.errors) return next({status:404, message: 'Id not found', errors: data.errors})

  res.status(200).json({data})
}

function create (req,res,next){
  const result = model.create(req.body)

  if (result.errors) return next({status:400, message: 'Could not create new post', errors: result.errors})

  res.status(201).json({data: result})
}

function changeOne(req,res,next){
  const id = req.params.id
  const changed = model.change(id, req.body)

  if (changed.errors) return next({status:400, message: 'Could not change specified post', errors: changed.errors})

  res.status(200).json({data: changed})
}

function deleteOne(req,res,next){
  const id = req.params.id
  const deleted = model.remove(id)

  if (deleted.errors) return next({status:400, message: 'Could not delete the specified post', errors: deleted.errors})

  res.status(200).json({data: deleted})
}

module.exports = {getAll, getOne, create, changeOne, deleteOne }
