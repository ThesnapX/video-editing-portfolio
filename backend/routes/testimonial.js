const express = require("express");
const router = express.Router();
const Testimonial = require("../models/Testimonial");
const adminAuth = require("../middleware/auth");

// Get all testimonials
router.get("/", async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new testimonial (admin only)
router.post("/", adminAuth, async (req, res) => {
  try {
    const { firstName, lastName, profession, message } = req.body;

    const testimonial = new Testimonial({
      firstName,
      lastName,
      profession,
      message,
    });

    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete testimonial (admin only)
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: "Testimonial deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
