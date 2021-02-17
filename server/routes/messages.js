const express = require('express'),
    router = express.Router()

const controllers = require('../controllers/messages');
const middleware = require('../middleware/auth')

/* Consider moving the new reply and new message routes into /:message_id/reply/ and /new/ respectively */

router.route('/')
    .get(controllers.getMessages)
    .post(middleware.checkAuth, controllers.createMessage)

router.route('/:message_id')
    .get(controllers.getMessage)
    .delete(middleware.checkMessageOwner, controllers.deleteMessage)
    .patch(middleware.checkAuth, controllers.likeMessage)

router.route('/:message_id/reply')
    .post(middleware.checkAuth, controllers.createReply)

module.exports = router;