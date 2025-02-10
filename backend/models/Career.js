import mongoose from "mongoose";

const CareerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  organisation: { type: String, required: true },
  serviceType: { type: String, required: true },
  elaboration: { type: String, required: true },
  phone: { type: String, required: false },
  email: { type: String, required: false },
}, { timestamps: true });

const Career = mongoose.model("Career", CareerSchema);

export default Career;
