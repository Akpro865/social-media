const express = require('express')
const router = express.Router()
const { register, login, logout, generateAccessToken } = require('../controllers/auth')
const { updateUser } = require('../controllers/user')
const { verify } = require('../middlewares/verify')

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/refreshtoken', generateAccessToken)
router.put('/update', verify, updateUser)

module.exports = router