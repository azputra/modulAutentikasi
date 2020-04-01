const userController = require('../controllers/user')
const router = require('express').Router()
const authenticate = require("../middleware/authentication")
const authorize = require("../middleware/authorize")

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/send2FA/:userId', userController.send2FA)
router.get('/check2FA/:userId', userController.check2FA)
router.use(authenticate)
router.put('/resetPassword', authorize, userController.resetPassword)

module.exports = router