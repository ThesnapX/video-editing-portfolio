const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");
const adminAuth = require("../middleware/auth");

// Create new lead (public)
router.post("/", async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();
    res.status(201).json({ message: "Lead created successfully", lead });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all leads (admin only)
router.get("/", adminAuth, async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update lead status (admin only)
router.put("/:id", adminAuth, async (req, res) => {
  try {
    const { status, finalPrice, deadline, projectDescription } = req.body;
    const lead = await Lead.findById(req.params.id);

    if (status) lead.status = status;
    if (finalPrice !== undefined) lead.finalPrice = finalPrice;
    if (deadline) lead.deadline = deadline;
    if (projectDescription) lead.projectDescription = projectDescription;

    await lead.save();
    res.json({ message: "Lead updated successfully", lead });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete lead (admin only)
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ message: "Lead deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
