import mongoose from "mongoose";

const professionalSchema = new mongoose.Schema({
  professional_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  experience: { type: Number, required: true },
  location: { type: String, required: true },
  address: { type: String, required: true },
  is_available: { type: Boolean, required: true },
  profile_picture: { data: Buffer, contentType: String },
  phone_number: { type: Number, required: true },
  next_of_kin: { type: String, required: true },
  nok_phone_number: { type: Number, required: true },
  email: { type: String, required: true },
  skills: { type: String, required: true },
  profession: { type: String, required: true },
  bio: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Professional", professionalSchema);
