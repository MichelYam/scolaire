const Event = require('../models/Event')
const jwt = require('jsonwebtoken')

module.exports.createEvent = async (req) => {
    try {
        const newEvent = new Event({
            title: req.body.title,
            description: req.body.description,
            assignee: req.body.assignee,
            date: req.body.date,
            timetable: req.body.timetable,
            createdBy: req.body.createdBy,
        })
        let result = await newEvent.save()
        return result
    } catch (error) {
        console.error('Error in eventService.js', error)
        throw new Error(error)
    }
}

module.exports.getUserEvents = async (req) => {
    const jwtToken = req.headers.authorization.split('Bearer')[1].trim()
    const decodedJwtToken = jwt.decode(jwtToken)
    try {
        const events = await Event.find({ $or: [{ assignee: decodedJwtToken.email }, { createdBy: decodedJwtToken.email }] })

        if (!events) {
            throw new Error('Events not found!')
        }
        return events
    } catch (error) {
        console.error('Error in userService.js', error)
        throw new Error(error)
    }
}

module.exports.updateEvent = async req => {
    try {
        const jwtToken = req.headers.authorization.split('Bearer')[1].trim()
        const decodedJwtToken = jwt.decode(jwtToken)
        const event = await User.findOneAndUpdate(
            { _id: decodedJwtToken.id },
            {
                title: req.body.title,
                description: req.body.description,
                assignee: req.body.assignee,
                date: req.body.date,
            },
            { new: true }
        )

        if (!event) {
            throw new Error('Event not found!')
        }

        return event.toObject()
    } catch (error) {
        console.error('Error in eventService.js', error)
        throw new Error(error)
    }
}

module.exports.deleteEvent = async req => {
    try {
        const event = await Event.findByIdAndDelete(req.body._id)

        if (!event) {
            throw new Error('Event not found!')
        }

        return event.toObject()
    } catch (error) {
        console.error('Error in eventService.js', error)
        throw new Error(error)
    }
}
