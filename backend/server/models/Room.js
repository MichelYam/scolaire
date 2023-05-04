const mongoose = require('mongoose');

// const roomSchema = mongoose.Schema({
//     roomName: {
//         type: String,
//         default: ''
//     },
//     users: {
//         type: [
//             {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: 'user'
//             }
//         ],
//         default: []
//     },
//     pfpUrl: {
//         type: String,
//         default: ''
//     },
//     messages: {
//         type: [
//             {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: 'message',
//                 required: true
//             }
//         ],
//         default: []
//     },
//     createdBy: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'user'
//     }
// })
const roomSchema = new mongoose.Schema({
    roomName: {
        type: String,
        trim: true
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "message",
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
},
    { timestamps: true }
);
roomSchema.query.byRoomId = function (roomID) {
    return this.where({ roomID: roomID })
}

module.exports = Room = mongoose.model('room', roomSchema);