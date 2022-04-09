const express = require('express')
const router = express.Router()
const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')
const postCtrl = require('../controllers/posts')

router.get('/get', auth, postCtrl.getPosts)
router.post('/uploadpost', auth, postCtrl.uploadPost)

module.exports = router