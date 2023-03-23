const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const EventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  dateDue: {
    type: String
  },
  assignee: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Event = mongoose.model("events", EventSchema);
