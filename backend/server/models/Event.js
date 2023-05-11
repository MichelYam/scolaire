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
  date: {
    type: Date,
  },
  timetable: {
    type: String
  },
  assignee: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
});

module.exports = Event = mongoose.model("events", EventSchema);
