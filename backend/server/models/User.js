const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ROLES = {
  Admin: 'Admin',
  Tutor: 'Tutor',
  Student: 'Student',
}
// Create Schema
const UserSchema = new Schema({
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
    required: true,
    // select: false
  },
  role: {
    type: String,
    enum: ['Admin', 'Student', "Tutor"]
  },
  friendList: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  ]
  ,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("user", UserSchema);
module.exports.ROLES = ROLES;
