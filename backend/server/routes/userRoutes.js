const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const tokenValidation = require('../middleware/tokenValidation')
// const authorize = require("../middleware/role")
// const Role = require('../models/User');


router.post('/signup', userController.createUser)

router.post('/login', userController.loginUser)

router.post(
  '/profile',
  tokenValidation.validateToken,
  userController.getUserProfile
)

router.put(
  '/profile',
  tokenValidation.validateToken,
  userController.updateUserProfile
)

router.get(
  '/users',
  // tokenValidation.validateToken,
  // authorize(Role.Admin),
  userController.getAllUsers
)
router.delete(
  "/delete/:id",
  userController.deleteUser
)

module.exports = router
