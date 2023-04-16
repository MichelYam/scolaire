const mongoose = require("mongoose")

const NotificationSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "user"
    },
    recipient: {
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

module.exports = Notification = mongoose.model("notification", NotificationSchema);
