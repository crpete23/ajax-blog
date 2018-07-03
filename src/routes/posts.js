const express = require('express')
const router = express.Router()
const postsController = require('../controllers/posts.js')
const transController = require('../controllers/trans.js')

router.get('/', postsController.getAll)
router.get('/:id', postsController.getOne)
router.post('/', postsController.create)
router.put('/:id', postsController.changeOne)
router.delete('/:id', postsController.deleteOne)

module.exports = router
