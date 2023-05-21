const User = require('../models/User')
const Notification = require('../models/Notification')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.createUser = async serviceData => {
  try {
    const user = await User.findOne({ email: serviceData.email })
    if (user) {
      throw new Error('Email already exists')
    }

    const hashPassword = await bcrypt.hash(serviceData.password, 12)
    console.log("info", serviceData)
    const newUser = new User({
      firstName: serviceData.firstName,
      lastName: serviceData.lastName,
      dateOfBirth: serviceData.dateOfBirth,
      avatar: serviceData.avatar,
      email: serviceData.email,
      country: serviceData.country,
      city: serviceData.city,
      codePostal: serviceData.codePostal,
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
    const user = await User.findOne({ _id: decodedJwtToken.id }).populate("friendList").sort({ 'friendList.lastName': 1 }).select('-password')

    if (!user) {
      throw new Error('User not found!')
    }

    return user.toObject()
  } catch (error) {
    console.error('Error in userService.js', error)
    throw new Error(error)
  }
}

module.exports.updateUserProfile = async req => {
  const file = req.file ? req.file.filename : null;
  console.log("test", `${req.protocol}://${req.get('host')}/images/${file}`)
  // console.log("z", req.file)
  try {
    // const jwtToken = req.headers.authorization.split('Bearer')[1].trim()
    // const decodedJwtToken = jwt.decode(jwtToken)
    // var fs = require('fs');
    // var filePath = 'c:/images/pic.png';
    // fs.unlinkSync(filePath);
    const user = await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        avatar: file,
        country: req.body.country,
        city: req.body.city,
        codePostal: req.body.codePostal,
        phone: req.body.phone,
        bio: req.body.bio,
        dateOfBirth: req.body.dateOfBirth,
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


module.exports.getFriendList = async (req) => {
  try {
    // const usersFromDB = await User.find()
    const user = await User.find({ _id: req.user.id })

    return user.map(user => {
      return {
        id: user._id,
        friendList: user.friendList
      }
    })
  } catch (error) {
    console.error('Error in userService.js', error)
    throw new Error(error)
  }
}

module.exports.sendFriendRequest = async (req, res) => {
  const { id } = req.user
  const { email } = req.body
  const dataRecipient = await User.findOne({ email: email })
  console.log("dataRecipient", id)

  if (!dataRecipient) {
    throw new Error('User not found!')
  }

  try {
    const foundFriendRequest = await Notification.findOne({
      sender: id,
      recipient: dataRecipient._id
    })
    //message d'erreur requete existant
    if (foundFriendRequest) return res.status(400).send()


    const newFriendRequest = new Notification({
      sender: id,
      recipient: dataRecipient._id,
      status: 'pending',
    });

    let result = await newFriendRequest.save()
    return result

  } catch (error) {
    console.error('Error in notificationService.js', error)
    throw new Error(error)
  }
}


module.exports.rejectFriendRequest = async (req) => {
  // const recipientId = req.user._id;
  // const senderId = req.body.notificationId;
  const { id } = req.params
  try {

    // const deletedFriendRequest = await Notification.findOneAndDelete({
    //   sender: senderId,
    //   recipient: recipientId,
    // });
    const deletedFriendRequest = await Notification.findOneAndDelete({
      _id: id
    });
    // const updatedRequests = await FriendRequest.find({
    //   recipient: req.tokenUser.userId,
    //   status: 'pending',
    // });

    return deletedFriendRequest.toObject()
  } catch (error) {
    console.error('Error in notificationService.js', error)
    throw new Error(error)
  }
}

// accepte Friend Request and update friend list 
module.exports.acceptFriendRequest = async (req, res) => {
  const recipientId = req.user.id
  const senderId = req.body.senderId
  try {
    // const updatedSender = await User.findOneAndUpdate(
    await User.findOneAndUpdate(
      { _id: senderId, friendList: { $nin: [recipientId] } },
      { $push: { friendList: recipientId } },
      { new: true }
    );
    // updatedSender.toObject()
    const updatedRecipient = await User.findOneAndUpdate(
      // await User.findOneAndUpdate(
      { _id: recipientId, friendList: { $nin: [senderId] } },
      {
        $push: { friendList: senderId },
      },
      { new: true }
    );

    if (updatedRecipient) {
      await Notification.findOneAndUpdate(
        {
          sender: senderId,
          recipient: recipientId,
        },
        {
          $set: { status: 'accepted' },
          // $push: { friendshipParticipants: [senderId, recipientId] },
        },
        { new: true }
      );
      const updatedRequests = await Notification.find({
        recipient: req.user.id,
        status: 'pending',
      }).populate("sender").select('-password');

      return updatedRequests
      // res.status(200).send({
      //   updatedRequests: updatedRequests,
      //   updatedUserFriendList: updatedRecipient.friendList,
      // });
    }
  } catch (error) {
    console.error('Error in notificationService.js', error)
    throw new Error(error)
  }
}

// get friend requests of current user
module.exports.getFriendRequest = async (req) => {
  try {
    const requests = await Notification.find({
      recipient: req.user.id,
      status: "pending"
    }).populate("sender").select('-password');
    return requests
  } catch (error) {
    console.error('Error in notificationService.js', error)
    throw new Error(error)
  }
}
