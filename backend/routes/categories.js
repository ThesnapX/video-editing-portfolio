const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const adminAuth = require("../middleware/auth");

// Get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ message: err.message });
  }
});

// Create new category (admin only)
router.post("/", adminAuth, async (req, res) => {
  try {
    const { name } = req.body;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const category = new Category({ name, slug });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    console.error("Error creating category:", err);
    res.status(400).json({ message: err.message });
  }
});

// Delete category (admin only)
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error("Error deleting category:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
