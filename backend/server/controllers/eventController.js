const eventService = require('../services/eventService')

module.exports.createEvent = async (req, res) => {
  let response = {}
  try {
    const responseFromService = await eventService.createEvent(req)
    response.status = 200
    response.message = 'Event successfully created'
    response.body = responseFromService
  } catch (error) {
    console.error('Something went wrong in eventController.js', error)
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}

module.exports.getUserEvents = async (req, res) => {
  let response = {}
  try {
    const responseFromService = await eventService.getUserEvents(req)
    response.status = 200
    response.message = 'Successfully got user events'
    response.body = responseFromService
  } catch (error) {
    console.log('Error in eventController.js')
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}

module.exports.updateEvent = async (req, res) => {
  let response = {}

  try {
    const responseFromService = await eventService.updateEvent(req)
    response.status = 200
    response.message = 'Successfully updated event data'
    response.body = responseFromService
  } catch (error) {
    console.log('Error in updateEvent - eventController.js')
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}

module.exports.deleteEvent = async (req, res) => {
  let response = {}

  try {
    const responseFromService = await eventService.deleteEvent(req)
    response.status = 200
    response.message = 'Successfully delete the event'
    response.body = responseFromService
  } catch (error) {
    console.log('Error in deleteEvent - eventController.js')
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}
