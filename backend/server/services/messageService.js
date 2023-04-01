const Message = require('../models/message')
const jwt = require('jsonwebtoken')

module.exports.createMessage = async (req) => {
    try {
        // const newMessage = new Message(req.body);
        const newMessage = new Message({
            roomId: req.body.roomId,
            sender: req.body.sender,
            content: req.body.content
        })
        let result = await newMessage.save()

        return result
    } catch (error) {
        console.error('Error in roomService.js', error)
        throw new Error(error)
    }
}

module.exports.getMessages = async (req) => {
    try {
        const messages = await Message.find({
            roomId: req.params.roomID,
        });

        return messages
    } catch (error) {
        console.error('Error in roomService.js', error)
        throw new Error(error)
    }
}

