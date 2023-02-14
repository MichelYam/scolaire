const express = require('express')
const router = express.Router()
const chatController = require('../controllers/chatController')
// const tokenValidation = require('../middleware/tokenValidation')

// get all the user issue's

router.get(
    '/getAllMessages',
    chatController.createRoom
)
router.post(
    '/sendMessage',
    chatController.getUserTasks
)

module.exports = router
