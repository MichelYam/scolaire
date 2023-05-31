const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const ROLES = {
  Admin: 'Admin',
  Tutor: 'Tutor',
  Student: 'Student',
}
// Create Schema
const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "Your first name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Your last name is required"],
  },
  avatar: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  dateOfBirth: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  codePostal: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: ""
  },
  role: {
    type: String,
    enum: ['admin', 'student', "tutor"]
  },
  friendList:
  {
    type: [Schema.Types.ObjectId],
    ref: 'user'
  }
  ,
  resetToken: {
    type: String,
    default: ''
  },
  expireToken: Date,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = User = mongoose.model("user", userSchema);
module.exports.ROLES = ROLES;
