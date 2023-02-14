const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    roomName: {
        type: String,
    },
    people: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }
        ],
        default: []
    },
    pfpUrl: {
        type: String,
        default: ''
    },
    messages: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'message',
                required: true
            }
        ],
        default: []
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

roomSchema.query.byRoomId = function (roomid) {
    return this.where({ roomId: roomid })
}

module.exports = Room = mongoose.model('room', roomSchema);