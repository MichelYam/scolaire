const Message = require('../models/Message')
const Room = require('../models/Room')
const jwt = require('jsonwebtoken')

module.exports.createMessage = async (req) => {
    try {
        // const newMessage = new Message(req.body);
        const newMessage = new Message({
            roomId: req.body.roomId,
            sender: req.body.sender,
            content: req.body.content
        })
        // await Room.findByIdAndUpdate(req.body.roomId, { latestMessage: newMessage });
        await Room.findOneAndUpdate(
            { _id: req.body.roomId },
            { latestMessage: newMessage },
            { new: true }
        )
        let result = await newMessage.save()
        return result
    } catch (error) {
        console.error('Error in messageService.js', error)
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
        console.error('Error in messageService.js', error)
        throw new Error(error)
    }
}

