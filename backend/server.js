import "dotenv/config"; // Load environment variables
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import contactRoutes from "./routes/contactRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb+srv://influidity:influiditypassword@cluster0.uww04.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 ", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error: ", err));

app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
