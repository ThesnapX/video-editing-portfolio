const express = require("express");
const router = express.Router();
const Service = require("../models/Service");
const adminAuth = require("../middleware/auth");
const upload = require("../middleware/upload");

// Get all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    console.error("Error fetching services:", err);
    res.status(500).json({ message: err.message });
  }
});

// Add new service (admin only)
router.put("/:id", adminAuth, upload.single("thumbnail"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const updateData = { title, description };

    if (req.file) {
      updateData.thumbnail = `/uploads/${req.file.filename}`;
    }

    const service = await Service.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(service);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete service (admin only)
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json({ message: "Service deleted successfully" });
  } catch (err) {
    console.error("Error deleting service:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
