const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TaskSchema = new Schema({
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
  status: {
    type: String,
    default: "en cours"
  },
  date: {
    type: Date,
    default: Date.now()
  }
}
);

module.exports = Task = mongoose.model("task", TaskSchema);
