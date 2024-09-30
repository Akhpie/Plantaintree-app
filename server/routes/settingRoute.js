import express from "express";
import { Settings } from "../models/SettingsModel.js"; // Ensure the correct path
const router = express.Router();

// Get current settings
router.get("/", async (req, res) => {
  try {
    const settings = await Settings.findOne(); // Fetch the settings
    res.json(settings); // Return the settings
  } catch (error) {
    res.status(500).json({ message: "Error fetching settings" });
  }
});

// Update settings
router.post("/", async (req, res) => {
  try {
    const { blogsVisible } = req.body;
    await Settings.findOneAndUpdate({}, { blogsVisible }, { upsert: true }); // Upsert to create if it doesn't exist
    res.sendStatus(200); // Send success status
  } catch (error) {
    res.status(500).json({ message: "Error updating settings" });
  }
});

export default router;
