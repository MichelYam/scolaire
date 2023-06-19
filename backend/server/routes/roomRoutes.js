const express = require('express')
const router = express.Router()
const roomController = require('../controllers/roomController')
const tokenValidation = require('../middleware/tokenValidation')

// get all the user issue's


router.get(
    '/',
    tokenValidation.validateToken,
    roomController.getUserRooms
)
router.get(
    '/:roomId',
    tokenValidation.validateToken,
    roomController.getUserRoomByID
)
router.post(
    '/',
    tokenValidation.validateToken,
    roomController.createRoom
)
router.put(
    '/',
    roomController.updateRoom
)
// router.put(
//     "/addToRoom",
//     // tokenValidation.validateToken,
//     roomController.deleteTask
// )
// router.delete(
//     '/removeFromRoom',
//     roomController.getUserTasks
// )

module.exports = router
