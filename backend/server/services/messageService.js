const Message = require('../models/message')
const jwt = require('jsonwebtoken')

module.exports.createMessage = async (req) => {
    try {
        const newMessage = new Message(req.body);
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
            _id: req.params.roomID,
        });

        return messages
    } catch (error) {
        console.error('Error in roomService.js', error)
        throw new Error(error)
    }
}

