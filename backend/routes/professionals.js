import express from "express";
import Professional from "../models/professionals.js";
import cors from "cors";

const router = express.Router();
router.use(express.json());
router.use(cors());

//fetching a record
router.get("/", async (req, res) => {
  try {
    const professionals = await Professional.find();
    res.status(200).json(professionals);
  } catch (error) {
    res.status(500).json({ message: "Error fetching professionals", error });
  }
});

//adding a record
router.post("/", async (req, res) => {
  try {
    const newProfessionals = new Professional(req.body);
    await newProfessionals.save();
    res.status(201).json(newProfessionals);
  } catch (error) {
    res.status(500).json({ message: "Error creating Professionals", error });
  }
});

//updating a record
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateProfessionals = await Professional.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updateProfessionals) {
      return res.status(404).json({ message: "Professional not found" });
    }
    res.status(200).json(updateProfessionals);
  } catch (error) {
    res.status(500).json({ message: "Error updating Professionals", error });
  }
});

//deleting a record
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProfessionals = await Professional.findByIdAndDelete(id);
    if (!deletedProfessionals) {
      return res.status(404).json({ message: "Professional not found" });
    }
    res.status(200).json({ message: "Professional deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting professional", error });
  }
});

export default router;
