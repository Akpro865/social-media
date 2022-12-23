const express = require('express')
const router = express.Router()
const { searchUsers, getSearchUser } = require('../controllers/user')
const { verify } = require('../middlewares/verify')

router.get('/', verify, searchUsers)
router.get('/:id', verify, getSearchUser)

module.exports = router