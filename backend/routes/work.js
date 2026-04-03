const express = require("express");
const router = express.Router();
const Work = require("../models/Work");
const adminAuth = require("../middleware/auth");

// Get all work
router.get("/", async (req, res) => {
  try {
    console.log("Fetching all work");
    const works = await Work.find().sort({ createdAt: -1 });
    res.json(works);
  } catch (err) {
    console.error("Error fetching work:", err);
    res.status(500).json({ message: err.message });
  }
});

// Get work by category
router.get("/category/:category", async (req, res) => {
  try {
    console.log("Fetching work for category:", req.params.category);
    const works = await Work.find({ category: req.params.category }).sort({
      createdAt: -1,
    });
    res.json(works);
  } catch (err) {
    console.error("Error fetching work by category:", err);
    res.status(500).json({ message: err.message });
  }
});

// Update work (admin only)
router.put("/:id", adminAuth, async (req, res) => {
  try {
    const { title, videoUrl, category } = req.body;

    // Extract YouTube thumbnail if video URL changed
    let thumbnail = "";
    if (videoUrl) {
      const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
      const match = videoUrl.match(youtubeRegex);
      if (match) {
        thumbnail = `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
      }
    }

    const updateData = {
      title,
      videoUrl,
      category,
      ...(thumbnail && { thumbnail }),
    };

    const work = await Work.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!work) {
      return res.status(404).json({ message: "Work not found" });
    }

    res.json(work);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete work (admin only)
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    console.log("Deleting work:", req.params.id);
    const work = await Work.findByIdAndDelete(req.params.id);

    if (!work) {
      return res.status(404).json({ message: "Work not found" });
    }

    res.json({ message: "Work deleted successfully" });
  } catch (err) {
    console.error("Error deleting work:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
