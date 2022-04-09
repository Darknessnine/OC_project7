const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const usersCtrl = require('../controllers/users')

router.post('/signup', usersCtrl.signup)
router.post('/login', usersCtrl.login)
router.delete('/profile/:id', auth, usersCtrl.deleteProfile)

module.exports = router