// routes.js

const express = require("express");
const Student = require("./Student");

const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const students = await Student.find();
    console.log("students", students);
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/users", async (req, res) => {
  try {
    const { name, sex, date, group } = req.body;
    const student = new Student({ name, sex, date, group });
    await student.save();
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/users/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const { name, sex, date, group } = req.body;
    const student = await Student.findByIdAndUpdate(
      _id,
      { name, sex, date, group },
      { new: true }
    );
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/users/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    await Student.findByIdAndDelete(_id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
