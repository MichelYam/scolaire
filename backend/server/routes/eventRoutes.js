const express = require('express')
const router = express.Router()
const eventController = require('../controllers/eventController')
const tokenValidation = require('../middleware/tokenValidation')
const verifyRoles = require('../middleware/verifyRoles');
const { ROLES } = require("../models/User")


router.post(
    '/',
    tokenValidation.validateToken,
    verifyRoles(ROLES.Tutor, ROLES.Admin),
    eventController.createEvent,
)

router.get(
    '/',
    // tokenValidation.validateToken,
    eventController.getUserEvents
)

router.put(
    '/:id',
    tokenValidation.validateToken,
    verifyRoles(ROLES.Tutor, ROLES.Admin),
    eventController.updateEvent
)

router.delete(
    "/:id",
    // tokenValidation.validateToken,
    verifyRoles(ROLES.Tutor, ROLES.Admin),
    eventController.deleteEvent,
)
module.exports = router
