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
        return result.populate("sender")
    } catch (error) {
        console.error('Error in messageService.js', error)
        throw new Error(error)
    }
}

module.exports.getMessages = async (req) => {
    try {
        const messages = await Message.find({
            roomId: req.params.roomID,
        }).populate({ path: 'sender', select: 'firstName lastName avatar' });
        return messages
    } catch (error) {
        console.error('Error in messageService.js', error)
        throw new Error(error)
    }
}

module.exports.updateMessage = async (req, res) => {
    try {
        const message = await Message.findOneAndUpdate(
            { _id: req.user.id },

            {
                content: req.body.content,
                update: true
            })
        return message.toObject()

    } catch (error) {
        console.error('Error in messageService.js', error)
        throw new Error(error)
    }
}

module.exports.deleteMessage = async (req, res) => {
    const { id } = req.params

    try {
        const message = await Message.findByIdAndDelete(id)

        if (!message) {
            throw new Error('Message not found!')
        }
        return message.toObject()

    } catch (error) {
        console.error('Error in messageService.js', error)
        throw new Error(error)
    }
}