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
    res.status(500).json({ message: err.message });
  }
});

// Add new service (admin only)
router.post("/", adminAuth, upload.single("thumbnail"), async (req, res) => {
  try {
    const { title, description } = req.body;

    const service = new Service({
      title,
      description,
      thumbnail: req.file.path,
    });

    await service.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete service (admin only)
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
