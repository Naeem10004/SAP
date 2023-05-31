import express from "express";
import { Student } from "../models/student.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

const router = express.Router();
//GET APi
router.get("/users", async (req, res) => {
  try {
    const students = await Student.find();
    // console.log("students", students);
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
// ADD API
router.post("/users", async (req, res) => {
  try {
    const { name, sex, dateOfBirth, group } = req.body;
    const student = new Student({ name, sex, dateOfBirth, group });
    await student.save();
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
//UPDATE API
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
//DELETE API
router.delete("/users/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    await Student.findByIdAndDelete(_id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
// REGISTER API
router.post("/api/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Perform registration logic here
    // Create a new user document in the MongoDB database
    const newUser = new User({ email, password });
    await newUser.save();

    // Return a success response
    res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Registration failed" });
  }
});
// LOGIN API
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find all users with the provided email and password
    const users = await User.find({ email, password });

    if (users.length === 0) {
      // No user found
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    // Generate a JWT token using the first user's email
    const token = jwt.sign({ email: users[0].email }, "secret_key");

    // Return the token as a response
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// LOG OUT API
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error during logout:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    res.status(200).json({ message: "Logged out successfully" });
  });
});

export default router;
