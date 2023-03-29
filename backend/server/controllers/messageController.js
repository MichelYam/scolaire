const messageService = require('../services/messageService')

module.exports.createMessage = async (req, res) => {
    let response = {}
    try {
        const responseFromService = await messageService.createMessage(req)
        response.status = 200
        response.message = 'Successfully create message'
        response.body = responseFromService
    } catch (error) {
        console.error('Something went wrong in messageController.js', error)
        response.status = 400
        response.message = error.message
    }

    return res.status(response.status).send(response)
}

module.exports.getMessages = async (req, res) => {
    let response = {}
    try {
        const responseFromService = await messageService.getMessages(req)
        response.status = 200
        response.message = 'Get successfully all messages'
        response.body = responseFromService
    } catch (error) {
        console.log('Error in messageController.js')
        response.status = 400
        response.message = error.message
    }

    return res.status(response.status).send(response)
}