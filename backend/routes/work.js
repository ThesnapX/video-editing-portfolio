const express = require("express");
const router = express.Router();
const Work = require("../models/Work");
const adminAuth = require("../middleware/auth");

// Get all work
router.get("/", async (req, res) => {
  try {
    const works = await Work.find().sort({ createdAt: -1 });
    res.json(works);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get work by category
router.get("/category/:category", async (req, res) => {
  try {
    const works = await Work.find({ category: req.params.category }).sort({
      createdAt: -1,
    });
    res.json(works);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new work (admin only)
router.post("/", adminAuth, async (req, res) => {
  try {
    const { title, videoUrl, category } = req.body;

    // Extract YouTube thumbnail
    let thumbnail = "";
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
    const match = videoUrl.match(youtubeRegex);

    if (match) {
      thumbnail = `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
    }

    const work = new Work({
      title,
      videoUrl,
      thumbnail,
      category: category || "all",
    });

    await work.save();
    res.status(201).json(work);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete work (admin only)
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    await Work.findByIdAndDelete(req.params.id);
    res.json({ message: "Work deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
