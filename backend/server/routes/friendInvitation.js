const express = require('express')
const router = express.Router()
const friendInvitationController = require('../controllers/friendInvitationController')
const tokenValidation = require('../middleware/tokenValidation')

// get all the user issue's


router.post(
    '/accept',
    tokenValidation.validateToken,
    friendInvitationController.acceptUser
)
router.post(
    '/invite',
    tokenValidation.validateToken,
    friendInvitationController.inviteUser
)
router.post(
    '/reject',
    tokenValidation.validateToken,
    friendInvitationController.rejectUser
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
