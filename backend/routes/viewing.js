import express from "express";
import cors from "cors";
import Viewing from "../models/viewing.js";
import Accommodation from "../models/accommodation.js"

const router = express.Router();

router.use(express.json());
router.use(cors());

// Adding a new viewing
router.post("/", async (req, res) => {
  try {
    const newViewing = new Viewing(req.body);
    await newViewing.save();
    res
      .status(200)
      .json({ message: "Viewing added successfully", data: newViewing });
  } catch (error) {
    res.status(500).json({ message: "Error adding a new record", error });
  }
});

// Fetching all viewings
router.get("/", async (req, res) => {
  try {
   const viewing = await Viewing.find().populate("residence_id");
    res.status(200).json(viewing); // ✅ Send the result!
  } catch (error) {
    res.status(500).json({ message: "Error fetching records", error }); // ✅ Fix error formatting
  }
});

// Deleting a viewing
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedViewing = await Viewing.findByIdAndDelete(id); // ✅ Add await
    if (!deletedViewing) {
      return res.status(404).json({ message: "Viewing not found" });
    }
    res.status(200).json({ message: "Viewing deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting viewing", error });
  }
});

// Updating a viewing
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedViewing = await Viewing.findByIdAndUpdate(id, req.body, {
      // ✅ Add await
      new: true,
      runValidators: true,
    });
    if (!updatedViewing) {
      return res.status(404).json({ message: "Viewing not found" }); // ✅ Add return
    }
    res
      .status(200)
      .json({ message: "Viewing updated successfully", data: updatedViewing });
  } catch (error) {
    res.status(500).json({ message: "Error updating viewing", error });
  }
});

export default router;
