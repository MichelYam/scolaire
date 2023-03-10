const express = require('express')
const router = express.Router()
const roomController = require('../controllers/roomController')
// const tokenValidation = require('../middleware/tokenValidation')

// get all the user issue's


router.get(
    '/',
    roomController.getUserRooms
)
router.post(
    '/createRoom',
    roomController.createRoom
)
router.put(
    '/updateRoom',
    roomController.updateRoom
)
router.put(
    "/addToRoom",
    // tokenValidation.validateToken,
    roomController.deleteTask
)
router.delete(
    '/removeFromRoom',
    roomController.getUserTasks
)

module.exports = router
