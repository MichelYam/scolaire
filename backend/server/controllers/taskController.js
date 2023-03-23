const taskService = require('../services/taskService')

module.exports.createTask = async (req, res) => {
  let response = {}
  try {
    const responseFromService = await taskService.createTask(req)
    response.status = 200
    response.message = 'Task successfully created'
    response.body = responseFromService
  } catch (error) {
    console.error('Something went wrong in taskController.js', error)
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}

module.exports.getUserTasks = async (req, res) => {
  let response = {}
  try {
    const responseFromService = await taskService.getUserTasks(req)
    response.status = 200
    response.message = 'Successfully got user tasks'
    response.body = responseFromService
  } catch (error) {
    console.log('Error in taskController.js')
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}

module.exports.getUserTasksAssignee = async (req, res) => {
  let response = {}
  try {
    const responseFromService = await taskService.getUserTasksAssignee(req)
    response.status = 200
    response.message = 'Successfully got user tasks'
    response.body = responseFromService
  } catch (error) {
    console.log('Error in taskController.js')
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}

module.exports.updateTask = async (req, res) => {
  let response = {}

  try {
    const responseFromService = await taskService.updateTask(req)
    response.status = 200
    response.message = 'Successfully updated task data'
    response.body = responseFromService
  } catch (error) {
    console.log('Error in updateTask - taskController.js')
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}

module.exports.deleteTask = async (req, res) => {
  let response = {}

  try {
    const responseFromService = await taskService.deleteTask(req)
    response.status = 200
    response.message = 'Successfully delete the task'
    response.body = responseFromService
  } catch (error) {
    console.log('Error in deleteTask - taskController.js')
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}
