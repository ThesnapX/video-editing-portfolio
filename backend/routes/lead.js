const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");
const adminAuth = require("../middleware/auth");

// Create new lead (public)
router.post("/", async (req, res) => {
  try {
    console.log("Creating new lead:", req.body);

    const {
      name,
      mobileNumber,
      channelName,
      channelLink,
      message,
      serviceName,
    } = req.body;

    // Validate required fields
    if (!name || !mobileNumber || !message || !serviceName) {
      return res.status(400).json({
        message: "Name, mobile number, message, and service name are required",
      });
    }

    const lead = new Lead({
      name,
      mobileNumber,
      channelName: channelName || "",
      channelLink: channelLink || "",
      message,
      serviceName,
      status: "new",
    });

    await lead.save();
    res.status(201).json({ message: "Lead created successfully", lead });
  } catch (err) {
    console.error("Error creating lead:", err);
    res.status(500).json({ message: err.message });
  }
});

// Get all leads (admin only)
router.get("/", adminAuth, async (req, res) => {
  try {
    console.log("Fetching all leads");
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    console.error("Error fetching leads:", err);
    res.status(500).json({ message: err.message });
  }
});

// Update lead status (admin only)
router.put("/:id", adminAuth, async (req, res) => {
  try {
    console.log("Updating lead:", req.params.id, req.body);
    const { status, finalPrice, deadline, projectDescription } = req.body;
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    if (status) lead.status = status;
    if (finalPrice !== undefined) lead.finalPrice = finalPrice;
    if (deadline) lead.deadline = new Date(deadline);
    if (projectDescription) lead.projectDescription = projectDescription;

    await lead.save();
    res.json({ message: "Lead updated successfully", lead });
  } catch (err) {
    console.error("Error updating lead:", err);
    res.status(500).json({ message: err.message });
  }
});

// Delete lead (admin only)
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    console.log("Deleting lead:", req.params.id);
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json({ message: "Lead deleted successfully" });
  } catch (err) {
    console.error("Error deleting lead:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
