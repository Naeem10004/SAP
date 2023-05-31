// Student.js

import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sex: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  group: { type: String, required: true },
});

export const Student = mongoose.model("Student", studentSchema);
