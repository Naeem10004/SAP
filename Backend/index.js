import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import timeout from "connect-timeout";
import routes from "./routes/routes.js";

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

    const sessionStore = MongoStore.create({
      mongoUrl: "mongodb://localhost/students",
      collectionName: "sessions",
    });

    // Configure session middleware
    app.use(
      session({
        secret: "your_secret_key",
        resave: false,
        saveUninitialized: true,
        rolling: true, // Reset expiration countdown on each request
        cookie: {
          maxAge: 30000, // 30 seconds
          secure: false, // Set to true if using HTTPS
          httpOnly: true,
        },
        store: sessionStore,
      })
    );

    // Configure timeout middleware
    app.use(timeout("30s"));

    // Add a middleware to reset  the session timeout on each request
    app.use((req, res, next) => {
      req.session.touch();
      next();
    });

    // Use the student routes
    app.use(routes);

    // Start the server
    app.listen(4000, () => {
      console.log("Server is listening on port 4000");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
