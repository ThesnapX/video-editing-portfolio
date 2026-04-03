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
    categories: [
      {
        type: String,
        trim: true,
      },
    ],
    relatedServices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
    ],
    description: {
      type: String,
      default: "",
    },
    duration: {
      type: String,
      default: "",
    },
    client: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Work", workSchema);
