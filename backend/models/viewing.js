import mongoose from "mongoose";
import Accommodation from "./accommodation.js";

const { Schema } = mongoose;

const viewingSchema = new Schema({
  residence_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Accommodation", // model name, not variable
    required: true,
  },
  request_id: {
    type: Number,
    required: true,
    unique: true,
  },
  fee: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Viewing", viewingSchema);
