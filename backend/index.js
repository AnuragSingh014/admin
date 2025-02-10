import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import contactRoutes from "./routes/contactRoutes.js";
import processRoutes from "./routes/processRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import careerRoutes from "./routes/careerRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

// Hardcoded authentication credentials
const USERNAME = "admin";
const PASSWORD = "password123";

// Middleware for basic authentication
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return res.status(401).json({ message: "Unauthorized: Missing credentials" });
  }

  const base64Credentials = authHeader.split(" ")[1];
  const decodedCredentials = Buffer.from(base64Credentials, "base64").toString("utf-8");
  const [username, password] = decodedCredentials.split(":");

  if (username === USERNAME && password === PASSWORD) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized: Invalid credentials" });
  }
};

mongoose
  .connect("mongodb://localhost:27017/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error: ", err));

// Apply authentication middleware to all routes
app.use(authenticate);
app.use("/api/contact", contactRoutes);
app.use("/api/process", processRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/career", careerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));