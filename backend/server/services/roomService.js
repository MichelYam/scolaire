const Room = require('../models/Room')
const jwt = require('jsonwebtoken')

module.exports.createRoom = async (req) => {

    // const chatExists = await Chat.findOne({
    //     users: {
    //         $all: [req.user._id, req.body.receiverId]
    //     }
    // });

    // if (chatExists) {
    //     return res.status(200).json({
    //         success: true,
    //         newChat: chatExists
    //     });
    // }
    try {
        const newRoom = new Room({
            users: [req.user.id, req.body.receiverId],
        })
        let result = await newRoom.save()
        return result
    } catch (error) {
        console.error('Error in roomService.js', error)
        throw new Error(error)
    }
}
// return usersFromDB.filter(user => user.email !== 'not-set').map(user => {
//     return {
//       id: user._id,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       role: user.role
//     }
//   })
module.exports.getUserRooms = async (req) => {

    try {
        let rooms = await Room.find(
            {
                users: {
                    $in: [req.user.id]
                }
            }
        ).sort({ updatedAt: -1 }).populate("users latestMessage").select('-password')

        return rooms
    } catch (error) {
        console.error('Error in roomService.js', error)
        throw new Error(error)
    }
}

module.exports.getUserRoomByID = async (req) => {
    try {
        let rooms = await Room.find({ _id: req.params.roomId })
        return rooms
    } catch (error) {
        console.error('Error in roomService.js', error)
        throw new Error(error)
    }
}

// module.exports.updateRoom = async serviceData => {
//     try {
//         const jwtToken = serviceData.headers.authorization.split('Bearer')[1].trim()
//         const decodedJwtToken = jwt.decode(jwtToken)
//         const task = await User.findOneAndUpdate(
//             { _id: decodedJwtToken.id },
//             {
//                 firstName: serviceData.body.firstName,
//                 lastName: serviceData.body.lastName
//             },
//             { new: true }
//         )

//         if (!task) {
//             throw new Error('Room not found!')
//         }

//         return task.toObject()
//     } catch (error) {
//         console.error('Error in taskService.js', error)
//         throw new Error(error)
//     }
// }

module.exports.deleteRoom = async req => {
    try {
        const task = await Room.findByIdAndDelete(req.body._id)

        if (!task) {
            throw new Error('Room not found!')
        }

        return task.toObject()
    } catch (error) {
        console.error('Error in taskService.js', error)
        throw new Error(error)
    }
}
