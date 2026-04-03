const express = require("express");
const router = express.Router();
const Work = require("../models/Work");
const Category = require("../models/Category");
const adminAuth = require("../middleware/auth");

// Get all work
router.get("/", async (req, res) => {
  try {
    const works = await Work.find()
      .populate("relatedServices")
      .sort({ createdAt: -1 });
    res.json(works);
  } catch (err) {
    console.error("Error fetching works:", err);
    res.status(500).json({ message: err.message });
  }
});

// Get work by category
router.get("/category/:category", async (req, res) => {
  try {
    const works = await Work.find({
      categories: { $in: [req.params.category] },
    })
      .populate("relatedServices")
      .sort({ createdAt: -1 });
    res.json(works);
  } catch (err) {
    console.error("Error fetching work by category:", err);
    res.status(500).json({ message: err.message });
  }
});

// Get all unique categories
router.get("/categories/all", async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ message: err.message });
  }
});

// Add new work (admin only)
router.post("/", adminAuth, async (req, res) => {
  try {
    console.log("Adding new work:", req.body);
    const {
      title,
      videoUrl,
      categories,
      relatedServices,
      description,
      duration,
      client,
    } = req.body;

    if (!title || !videoUrl) {
      return res
        .status(400)
        .json({ message: "Title and video URL are required" });
    }

    // Extract YouTube thumbnail
    let thumbnail = "";
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
    const match = videoUrl.match(youtubeRegex);

    if (match) {
      thumbnail = `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
    } else {
      return res.status(400).json({ message: "Invalid YouTube URL" });
    }

    // Process categories
    const categoryNames = Array.isArray(categories) ? categories : [categories];

    // Update or create categories
    for (const catName of categoryNames) {
      if (catName && catName.trim()) {
        const slug = catName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        await Category.findOneAndUpdate(
          { name: catName.trim() },
          { name: catName.trim(), slug, $inc: { count: 1 } },
          { upsert: true },
        );
      }
    }

    const work = new Work({
      title,
      videoUrl,
      thumbnail,
      categories: categoryNames,
      relatedServices: relatedServices || [],
      description: description || "",
      duration: duration || "",
      client: client || "",
    });

    await work.save();

    // Update service's related works
    if (relatedServices && relatedServices.length > 0) {
      const Service = require("../models/Service");
      for (const serviceId of relatedServices) {
        await Service.findByIdAndUpdate(serviceId, {
          $addToSet: { relatedWorks: work._id },
        });
      }
    }

    res.status(201).json(work);
  } catch (err) {
    console.error("Error adding work:", err);
    res.status(400).json({ message: err.message });
  }
});

// Update work (admin only)
router.put("/:id", adminAuth, async (req, res) => {
  try {
    const {
      title,
      videoUrl,
      categories,
      relatedServices,
      description,
      duration,
      client,
    } = req.body;

    let thumbnail = "";
    if (videoUrl) {
      const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
      const match = videoUrl.match(youtubeRegex);
      if (match) {
        thumbnail = `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
      }
    }

    const work = await Work.findById(req.params.id);
    if (!work) {
      return res.status(404).json({ message: "Work not found" });
    }

    // Update category counts
    const oldCategories = work.categories;
    const newCategories = Array.isArray(categories) ? categories : [categories];

    // Decrement old categories
    for (const cat of oldCategories) {
      await Category.findOneAndUpdate({ name: cat }, { $inc: { count: -1 } });
    }

    // Increment new categories
    for (const cat of newCategories) {
      if (cat && cat.trim()) {
        const slug = cat.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        await Category.findOneAndUpdate(
          { name: cat.trim() },
          { name: cat.trim(), slug, $inc: { count: 1 } },
          { upsert: true },
        );
      }
    }

    work.title = title;
    work.videoUrl = videoUrl;
    if (thumbnail) work.thumbnail = thumbnail;
    work.categories = newCategories;
    work.relatedServices = relatedServices || [];
    work.description = description || "";
    work.duration = duration || "";
    work.client = client || "";

    await work.save();
    res.json(work);
  } catch (err) {
    console.error("Error updating work:", err);
    res.status(400).json({ message: err.message });
  }
});

// Delete work (admin only)
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const work = await Work.findByIdAndDelete(req.params.id);

    if (!work) {
      return res.status(404).json({ message: "Work not found" });
    }

    // Decrement category counts
    for (const cat of work.categories) {
      await Category.findOneAndUpdate({ name: cat }, { $inc: { count: -1 } });
    }

    res.json({ message: "Work deleted successfully" });
  } catch (err) {
    console.error("Error deleting work:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
