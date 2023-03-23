const express = require('express')
const router = express.Router()
const taskController = require('../controllers/taskController')
const tokenValidation = require('../middleware/tokenValidation')
const verifyRoles = require('../middleware/verifyRoles');
const { ROLES } = require("../models/User")

router.post(
    '/create',
    tokenValidation.validateToken,
    verifyRoles(ROLES.Tutor, ROLES.Admin),
    taskController.createTask,
)

router.post(
    '/myTasks',
    tokenValidation.validateToken,
    taskController.getUserTasks
)

router.post(
    '/myTasksAssignee',
    tokenValidation.validateToken,
    taskController.getUserTasksAssignee
)

router.put(
    '/:_id',
    tokenValidation.validateToken,
    verifyRoles(ROLES.Tutor, ROLES.Admin),
    taskController.updateTask
)

router.delete(
    "/delete/:id",
    // tokenValidation.validateToken,
    verifyRoles(ROLES.Tutor, ROLES.Admin),
    taskController.deleteTask,
)
module.exports = router
