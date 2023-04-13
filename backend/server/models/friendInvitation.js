const mongoose = require("mongoose")

const friendRequestSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "user"
    },
    receiverId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "user"
    },
    status: {
        type: String,
        required: true
    },
},
    { timestamps: true }
)

module.exports = FriendRequest = mongoose.model("FriendRequest", friendRequestSchema);
