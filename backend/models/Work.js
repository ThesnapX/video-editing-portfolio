const mongoose = require("mongoose");

const workSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    videoUrl: {
      type: String,
      required: [true, "Video URL is required"],
      trim: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "all",
        "commercial",
        "music-video",
        "corporate",
        "social-media",
        "trailer",
      ],
      default: "all",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Work", workSchema);
