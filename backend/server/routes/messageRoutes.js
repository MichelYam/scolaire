const express = require('express')
const router = express.Router()
const messageController = require('../controllers/messageController')
const tokenValidation = require('../middleware/tokenValidation')


router.post(
    '/new',
    tokenValidation.validateToken,
    messageController.createMessage
)
router.get(
    '/:roomID',
    tokenValidation.validateToken,
    messageController.getMessages
)

module.exports = router
