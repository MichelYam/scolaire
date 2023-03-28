const Room = require("../models/Room")

const checkIfUserInRoom = async (req, res, next) => {
    // find the room 
    console.log('params room', req.params.roomId)
    console.log('body room', req.body.roomId)
    const room = await Room.findById(req.params.roomId || req.body.roomId).populate({ path: 'messages' })

    if (!room)
        return res.status(404).json({ err: 'Room corresponding to the room id not found' })

    if (!room.people.includes(req.user.id)) {
        return res.status(401).json({ err: 'You are not allowed to view the details of this group because you are not a member of the group' })
    }
    req.room = room;
    next();
}

module.exports = checkIfUserInRoom
