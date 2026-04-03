const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    longDescription: {
      type: String,
      default: "",
    },
    process: [
      {
        step: String,
        description: String,
      },
    ],
    pricing: {
      type: String,
      default: "Custom pricing based on project requirements",
    },
    turnaround: {
      type: String,
      default: "2-4 weeks",
    },
    relatedWorks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Work",
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Service", serviceSchema);
