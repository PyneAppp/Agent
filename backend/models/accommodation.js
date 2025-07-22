import mongoose from "mongoose";

const accommodationSchema = new mongoose.Schema({
  residence_id: { type: String, required: true, unique: true },
  image1: { type: String, required: true },
  image2: { type: String, required: true },
  image3: { type: String, required: true },
  image4: { type: String, required: true },
  image5: { type: String, required: true },
  image6: { type: String, required: true },
  residence_type: { type: String, required: true },
  description: { type: String, required: true },
  rentals: { type: Number, required: true },
  location: { type: String, required: true },
  deposit: { type: Number, required: true },
  rooms: { type: Number, required: true },
  date_posted: { type: Date, default: Date.now },
  owner: { type: String, required: true },
  owner_email: { type: String, required: true },
  owner_phone: { type: String, required: true },
  owner_address: { type: String, required: true },
  owner_id: { type: String, required: true },
});

export default mongoose.model("Accommodation", accommodationSchema);
