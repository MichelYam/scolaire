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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    content: {
        type: String,
        text: String,
        fileURL: String,
        isImage: Boolean,
        fileName: String
    },
    // readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    update: {
        type: Boolean,
        default: false
    },
    timeStamp: {
        type: Date,
        required: true,
        default: Date.now
    },
})

module.exports = Message = mongoose.model("message", MessageSchema);
