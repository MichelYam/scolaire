const Task = require('../models/task')
const jwt = require('jsonwebtoken')

module.exports.createRoom = async (req) => {
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
// roomName: {
//     type: String,
// },
// people: {
//     type: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'user'
//         }
//     ],
//     default: []
// },
// pfpUrl: {
//     type: String,
//     default: ''
// },
// messages: {
//     type: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'message',
//             required: true
//         }
//     ],
//     default: []
// },
// createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'user'
// }
module.exports.getUserRooms = async (req) => {
    const jwtToken = req.headers.authorization.split('Bearer')[1].trim()
    const decodedJwtToken = jwt.decode(jwtToken)
    try {
        console.log('/api/rooms/user', req.user)
        let allRooms = [];
        for (let roomId of req.user.rooms) {
            const room = await Room.findById(roomId)
            if (room) allRooms.push(room);
        }
        console.log('/api/rooms/user rooms', allRooms);
        res.status(200).json({ rooms: allRooms })
    } catch (error) {
        console.log(error);
        res.status(500).json({ errorMessage: 'error while joining rooms', error })
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
