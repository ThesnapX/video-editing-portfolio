const express = require("express");
const router = express.Router();
const Service = require("../models/Service");
const Work = require("../models/Work");
const adminAuth = require("../middleware/auth");
const upload = require("../middleware/upload");

// Get all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find()
      .populate("relatedWorks")
      .sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    console.error("Error fetching services:", err);
    res.status(500).json({ message: err.message });
  }
});

// Get single service by ID
router.get("/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate(
      "relatedWorks",
    );
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json(service);
  } catch (err) {
    console.error("Error fetching service:", err);
    res.status(500).json({ message: err.message });
  }
});

// Add new service (admin only)
router.post("/", adminAuth, upload.single("thumbnail"), async (req, res) => {
  try {
    console.log("Received service data:", req.body);
    console.log("Received file:", req.file);

    const {
      title,
      description,
      longDescription,
      process,
      pricing,
      turnaround,
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Service title is required" });
    }

    if (!description || !description.trim()) {
      return res
        .status(400)
        .json({ message: "Service description is required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Thumbnail image is required" });
    }

    let thumbnailUrl = req.file.path;
    if (
      process.env.NODE_ENV !== "production" &&
      !thumbnailUrl.startsWith("http")
    ) {
      thumbnailUrl = `/uploads/${req.file.filename}`;
    }

    const service = new Service({
      title: title.trim(),
      description: description.trim(),
      longDescription: longDescription || "",
      thumbnail: thumbnailUrl,
      process: process ? JSON.parse(process) : [],
      pricing: pricing || "Custom pricing based on project requirements",
      turnaround: turnaround || "2-4 weeks",
    });

    await service.save();
    res.status(201).json({
      message: "Service added successfully",
      service,
    });
  } catch (err) {
    console.error("Error adding service:", err);
    res.status(500).json({
      message: "Failed to add service. Please try again.",
      error: err.message,
    });
  }
});

// Update service (admin only)
router.put("/:id", adminAuth, upload.single("thumbnail"), async (req, res) => {
  try {
    const {
      title,
      description,
      longDescription,
      process,
      pricing,
      turnaround,
      relatedWorks,
    } = req.body;
    const updateData = {
      title,
      description,
      longDescription,
      process: process ? JSON.parse(process) : [],
      pricing,
      turnaround,
      relatedWorks: relatedWorks || [],
    };

    if (req.file) {
      let thumbnailUrl = req.file.path;
      if (
        process.env.NODE_ENV !== "production" &&
        !thumbnailUrl.startsWith("http")
      ) {
        thumbnailUrl = `/uploads/${req.file.filename}`;
      }
      updateData.thumbnail = thumbnailUrl;
    }

    const service = await Service.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(service);
  } catch (err) {
    console.error("Error updating service:", err);
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
