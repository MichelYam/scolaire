const mongoose = require('mongoose')
const Schema = mongoose.Schema


const MessageSchema = new Schema({
    // senderId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'user',
    //     required: true
    // },
    roomId: {
        type: String,
    },
    sender: {
        type: String,
    },
    content: {
        type: String,
        text: String,
        fileURL: String,
        isImage: Boolean,
        fileName: String
    },
    timeStamp: {
        type: Date,
        required: true,
        default: Date.now
    },
})

module.exports = Message = mongoose.model("message", MessageSchema);
