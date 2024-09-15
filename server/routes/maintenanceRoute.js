import express from "express";
import MaintenanceMode from "../models/MaintenanceMode.js"; // Named import

const router = express.Router();

// Endpoint to toggle maintenance mode
router.post("/toggle", async (req, res) => {
  try {
    const { isEnabled } = req.body;
    const maintenance = await MaintenanceMode.findOne();

    // If no maintenance mode document exists, create a new one
    if (!maintenance) {
      maintenance = new MaintenanceMode({ isEnabled });
    } else {
      maintenance.isEnabled = isEnabled;
    }

    await maintenance.save();
    res.status(200).json({
      message: `Maintenance mode ${isEnabled ? "enabled" : "disabled"}`,
    });
  } catch (error) {
    console.error("Error toggling maintenance mode:", error); // Log detailed error for debugging
    res.status(500).json({ message: "Error toggling maintenance mode" });
  }
});

// Endpoint to get maintenance mode status
router.get("/status", async (req, res) => {
  try {
    const maintenance = await MaintenanceMode.findOne();
    res.status(200).json({ isEnabled: maintenance?.isEnabled || false });
  } catch (error) {
    console.error("Error fetching maintenance status:", error); // Log detailed error for debugging
    res.status(500).json({ message: "Error fetching maintenance status" });
  }
});

export default router;
