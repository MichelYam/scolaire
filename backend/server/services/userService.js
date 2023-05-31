const User = require('../models/User')
const Notification = require('../models/Notification')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const dotenv = require('dotenv')

dotenv.config()

const SECRET = process.env.SECRET;
const HOST = process.env.SMTP_HOST
const PORT = process.env.SMTP_PORT
const USER = process.env.SMTP_USER
const PASS = process.env.SMTP_PASS


module.exports.createUser = async (req, res) => {

  const { firstName, lastName, city, codePostal, role, email, password, country, dateOfBirth } = req;
  try {
    const user = await User.findOne({ email: req.email })
    if (user) {
      throw new Error('Email already exists')
    }
    const hashPassword = await bcrypt.hash(req.password, 12)
    console.log("info", req)
    // const newUser = new User({
    //   firstName: req.firstName,
    //   lastName: req.lastName,
    //   dateOfBirth: req.dateOfBirth,
    //   email: req.email,
    //   country: req.country,
    //   city: req.city,
    //   codePostal: req.codePostal,
    //   password: hashPassword,
    //   role: req.role
    // })
    const newUser = new User({
      firstName,
      lastName,
      dateOfBirth,
      email,
      country,
      city,
      codePostal,
      password,
      resetToken: resetToken,
      role
    })
    let result = await newUser.save()
    // const token = createSecretToken(user._id);
    // res.cookie("token", token, {
    //   withCredentials: true,
    //   httpOnly: false,
    // });
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

module.exports.deleteUser = async req => {
  try {
    const { id } = req.params
    console.log("test", id);
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


module.exports.forgotPassword = (req, res) => {

  const { email } = req.body
  // NODEMAILER TRANSPORT FOR SENDING POST NOTIFICATION VIA EMAIL
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: USER,
      pass: PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  })
  // const user = User.findOne({ email: email })
  // console.log(user)
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err)
    }
    const token = buffer.toString("hex")


    User.findOne({ email: email })
      .then(user => {
        if (!user) {
          throw new Error('User does not exist in our database')
          // console.log("User does not exist in our database")
          // return res.status(422).json({ error: "User does not exist in our database" })
        }
        user.resetToken = token
        user.expireToken = Date.now() + 3600000
        user.save().then((result) => {
          transporter.sendMail({
            to: user.email,
            from: "test.test1958@outlook.com",
            subject: "Réinitalisation du mot de passe",
            html: `
                  <p>You requested for password reset from Arc Invoicing application</p>
                  <h5>Please click this <a href="http://localhost:3000/reset/${token}">link</a> to reset your password</h5>
                  <p>Link not clickable?, copy and paste the following url in your address bar.</p>
                  <p>http://localhost:3000/reset/${token}</p>
                  <P>If this was a mistake, just ignore this email and nothing will happen.</P>
                  `
          })
          // res.json({ message: "check your email" })
        }).catch((err) => console.log(err))

      })
  })
}

module.exports.resetPassword = async (req, res) => {
  const newPassword = req.body.password
  const sentToken = req.body.token
  const hashedpassword = await bcrypt.hash(newPassword, 12)
  try {
    const user = await User.findOneAndUpdate(
      { resetToken: sentToken, expireToken: { $gt: Date.now() } },
      {
        password: hashedpassword,
        resetToken: undefined,
        expireToken: undefined
      },
      { new: true }
    )

    if (!user) {
      throw new Error('User not found!')
    }

    return user.toObject()
  } catch (error) {
    console.error('Error in notificationService.js', error)
    throw new Error(error)
  }
}