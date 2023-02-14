const express = require('express')
const router = express.Router()
const taskController = require('../controllers/taskController')
const tokenValidation = require('../middleware/tokenValidation')

// get all the user issue's

router.post(
    '/create',
    taskController.createTask
)

router.post(
    '/myTasks',
    tokenValidation.validateToken,
    taskController.getUserTasks
)

// router.put(
//     '/:_id',
//     tokenValidation.validateToken,
//     taskController.updateTask
// )
router.delete(
    "/delete/:id",
    // tokenValidation.validateToken,
    taskController.deleteTask
)
module.exports = router
