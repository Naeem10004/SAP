// Student.js

const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  sex: String,
  date: { type: Date },
  group: String,
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
