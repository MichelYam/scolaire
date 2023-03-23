const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ROLES = {
  Admin: 'Admin',
  Tutor: 'Tutor',
  Student: 'Student',
}
// Create Schema
const UserSchema = new Schema({
  // name: {
  //   type: String,
  //   required: true
  // },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  profileImageUrl: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  dateOfBirth: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Admin', 'Student', "Tutor"]
  },
  friendList: {
    type: [Schema.Types.ObjectId],
    ref: 'User'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
module.exports.ROLES = ROLES;
