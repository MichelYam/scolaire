const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.createUser = async serviceData => {
  try {
    const user = await User.findOne({ email: serviceData.email })
    if (user) {
      throw new Error('Email already exists')
    }

    const hashPassword = await bcrypt.hash(serviceData.password, 12)

    const newUser = new User({
      firstName: serviceData.firstName,
      lastName: serviceData.lastName,
      dateOfBirth: serviceData.dateOfBirth,
      email: serviceData.email,
      password: hashPassword,
      role: serviceData.role
    })

    let result = await newUser.save()

    return result
  } catch (error) {
    console.error('Error in userService.js', error)
    throw new Error(error)
  }
}

module.exports.loginUser = async serviceData => {
  try {
    const user = await User.findOne({ email: serviceData.email })

    if (!user) {
      throw new Error('User not found!')
    }

    const isValid = await bcrypt.compare(serviceData.password, user.password)

    if (!isValid) {
      throw new Error('Password is invalid')
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role
      },
      process.env.SECRET_KEY || 'default-secret-key',
      { expiresIn: '1d' }
    )

    return { token }
  } catch (error) {
    console.error('Error in userService.js', error)
    throw new Error(error)
  }
}

module.exports.getUserProfile = async serviceData => {
  // console.log(serviceData.headers.authorization.split('Bearer')[1].trim())
  try {
    const jwtToken = serviceData.headers.authorization.split('Bearer')[1].trim()
    const decodedJwtToken = jwt.decode(jwtToken)
    const user = await User.findOne({ _id: decodedJwtToken.id })

    if (!user) {
      throw new Error('User not found!')
    }

    return user.toObject()
  } catch (error) {
    console.error('Error in userService.js', error)
    throw new Error(error)
  }
}

module.exports.updateUserProfile = async serviceData => {
  try {
    const jwtToken = serviceData.headers.authorization.split('Bearer')[1].trim()
    const decodedJwtToken = jwt.decode(jwtToken)
    const user = await User.findOneAndUpdate(
      { _id: decodedJwtToken.id },
      {
        firstName: serviceData.body.firstName,
        lastName: serviceData.body.lastName,
        email: serviceData.body.email,
      },
      { new: true }
    )

    if (!user) {
      throw new Error('User not found!')
    }

    return user.toObject()
  } catch (error) {
    console.error('Error in userService.js', error)
    throw new Error(error)
  }
}

module.exports.deleteUser = async serviceData => {
  try {
    const { id } = serviceData.params
    console.log(id);
    const user = await User.findByIdAndDelete(id)

    if (!user) {
      throw new Error('User not found!')
    }

    // return user.toObject()
  } catch (error) {
    console.error('Error in userService.js', error)
    throw new Error(error)
  }
}


module.exports.getAllUsers = async () => {
  try {
    const usersFromDB = await User.find()

    return usersFromDB.filter(user => user.email !== 'not-set').map(user => {
      return {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Error in userService.js', error)
    throw new Error(error)
  }
}