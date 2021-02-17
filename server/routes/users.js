const express = require('express'),
    router = express.Router()

const controllers = require("../controllers/users");
const middleware = require('../middleware/auth')

router.post('/signup', controllers.signUp)
router.post('/signin', controllers.signIn)
router.get('/logout', controllers.logout)
router.get('/checkAuth', middleware.checkAuth, controllers.checkAuth)

module.exports = router;