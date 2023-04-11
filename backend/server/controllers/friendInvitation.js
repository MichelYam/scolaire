const friendInvitationService = require('../services/friendInvitationService')

module.exports.inviteUser = async (req, res) => {
    let response = {}
    try {
        const responseFromService = await messageService.inviteUser(req, res)
        response.status = 200
        response.message = 'Invitation Successfully accepted'
        response.body = responseFromService
    } catch (error) {
        console.error('Something went wrong in messageController.js', error)
        response.status = 400
        response.message = error.message
    }

    return res.status(response.status).send(response)
}

module.exports.acceptUser = async (req, res) => {
    let response = {}
    try {
        const responseFromService = await messageService.acceptUser(req, res)
        response.status = 200
        response.message = 'Invitation Successfully Sent!'
        response.body = responseFromService
    } catch (error) {
        console.log('Error in messageController.js')
        response.status = 400
        response.message = error.message
    }

    return res.status(response.status).send(response)
}

module.exports.rejectUser = async (req, res) => {
    let response = {}
    try {
        const responseFromService = await messageService.rejectUser(req, res)
        response.status = 200
        response.message = 'Invitation Successfully Rejected!'
        response.body = responseFromService
    } catch (error) {
        console.log('Error in messageController.js')
        response.status = 400
        response.message = error.message
    }

    return res.status(response.status).send(response)
}