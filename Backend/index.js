const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const studentRoutes = require("./routes");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost/students", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    // Start the server
    app.listen(5000, () => {
      console.log("Server is listening on port 5000");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Use the student routes
app.use(studentRoutes);
