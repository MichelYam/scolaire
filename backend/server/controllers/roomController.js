const roomService = require('../services/roomService')

module.exports.getUserRooms = async (req, res) => {
    let response = {}
    try {
        const responseFromService = await roomService.getUserRooms(req)
        response.status = 200
        response.message = 'Get successfully all user rooms'
        response.body = responseFromService
    } catch (error) {
        console.error('Something went wrong in roomController.js', error)
        response.status = 400
        response.message = error.message
    }

    return res.status(response.status).send(response)
}
module.exports.getUserRoomByID = async (req, res) => {
    let response = {}
    try {
        const responseFromService = await roomService.getUserRoomByID(req)
        response.status = 200
        response.message = 'Get successfully room'
        response.body = responseFromService
    } catch (error) {
        console.error('Something went wrong in roomController.js', error)
        response.status = 400
        response.message = error.message
    }

    return res.status(response.status).send(response)
}

module.exports.createRoom = async (req, res) => {
    let response = {}
    try {
        const responseFromService = await roomService.createRoom(req)
        response.status = 200
        response.message = 'Successfully create room'
        response.body = responseFromService
    } catch (error) {
        console.log('Error in roomController.js')
        response.status = 400
        response.message = error.message
    }

    return res.status(response.status).send(response)
}

module.exports.updateRoom = async (req, res) => {
    let response = {}

    try {
        const responseFromService = await roomService.updateRoom(req)
        response.status = 200
        response.message = 'Successfully updated task data'
        response.body = responseFromService
    } catch (error) {
        console.log('Error in updateRoom - roomController.js')
        response.status = 400
        response.message = error.message
    }

    return res.status(response.status).send(response)
}

// module.exports.deleteTask = async (req, res) => {
//   let response = {}

//   try {
//     const responseFromService = await roomService.deleteTask(req)
//     response.status = 200
//     response.message = 'Successfully delete the task'
//     response.body = responseFromService
//   } catch (error) {
//     console.log('Error in deleteTask - taskController.js')
//     response.status = 400
//     response.message = error.message
//   }

//   return res.status(response.status).send(response)
// }
