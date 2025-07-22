import express from "express";
import cors from "cors";
import Accommodation from "../models/accommodation.js";

const router = express.Router();

// Middleware to parse JSON bodies
router.use(express.json());
// Middleware to enable CORS
router.use(cors());
// Import the Accommodation model

// Define the route to get all accommodations

//fetching records
router.get("/", async (req, res) => {
  try {
    const accommodations = await Accommodation.find();
    res.status(200).json(accommodations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching accommodations", error });
  }
});

//adding a record
router.post("/", async (req, res) => {
  try {
    const newAccommodation = new Accommodation(req.body);
    await newAccommodation.save();
    res.status(201).json(newAccommodation);
  } catch (error) {
    res.status(500).json({ message: "Error creating accommodation", error });
  }
});

//deleting a record
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAccommodation = await Accommodation.findByIdAndDelete(id);
    if (!deletedAccommodation) {
      return res.status(404).json({ message: "Accommodation not found" });
    }
    res.status(200).json({ message: "Accommodation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting accommodation", error });
  }
});

//updating a record
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAccommodation = await Accommodation.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedAccommodation) {
      return res.status(404).json({ message: "Accommodation not found" });
    }
    res.status(200).json(updatedAccommodation);
  } catch (error) {
    res.status(500).json({ message: "Error updating accommodation", error });
  }
});

export default router;
