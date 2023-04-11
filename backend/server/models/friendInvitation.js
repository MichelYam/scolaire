const mongoose = require("mongoose")

const friendInvitationSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    receiverId: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    }
})

module.exports = FriendInvitation = mongoose.model("FriendInvitation", friendInvitationSchema);
