const Task = require('../models/task')
const jwt = require('jsonwebtoken')

module.exports.createTask = async (req) => {
    try {
        const newTask = new Task({
            title: req.body.title,
            description: req.body.description,
            assignee: req.body.assignee,
            dateDue: req.body.dateDue,
            createdBy: req.body.createdBy,
        })
        let result = await newTask.save()
        return result
    } catch (error) {
        console.error('Error in taskService.js', error)
        throw new Error(error)
    }
}

module.exports.getUserTasks = async (req) => {
    const jwtToken = req.headers.authorization.split('Bearer')[1].trim()
    const decodedJwtToken = jwt.decode(jwtToken)
    try {
        const tasks = await Task.find({ assignee: decodedJwtToken.email })
        if (!tasks) {
            throw new Error('Tasks not found!')
        }
        return tasks
    } catch (error) {
        console.error('Error in userService.js', error)
        throw new Error(error)
    }
}

module.exports.getUserTasksAssignee = async (req) => {
    const jwtToken = req.headers.authorization.split('Bearer')[1].trim()
    const decodedJwtToken = jwt.decode(jwtToken)
    try {
        const tasks = await Task.find({ createdBy: decodedJwtToken.email })
        if (!tasks) {
            throw new Error('Tasks not found!')
        }
        return tasks
    } catch (error) {
        console.error('Error in userService.js', error)
        throw new Error(error)
    }
}

module.exports.updateTask = async serviceData => {
    try {
        const jwtToken = serviceData.headers.authorization.split('Bearer')[1].trim()
        const decodedJwtToken = jwt.decode(jwtToken)
        const task = await User.findOneAndUpdate(
            { _id: decodedJwtToken.id },
            {
                firstName: serviceData.body.firstName,
                lastName: serviceData.body.lastName
            },
            { new: true }
        )

        if (!task) {
            throw new Error('Task not found!')
        }

        return task.toObject()
    } catch (error) {
        console.error('Error in taskService.js', error)
        throw new Error(error)
    }
}

module.exports.deleteTask = async req => {
    try {
        const task = await Task.findByIdAndDelete(req.body._id)

        if (!task) {
            throw new Error('Task not found!')
        }

        return task.toObject()
    } catch (error) {
        console.error('Error in taskService.js', error)
        throw new Error(error)
    }
}
