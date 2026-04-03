const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    mobileNumber: {
      type: String,
      required: [true, "Mobile number is required"],
      trim: true,
    },
    channelName: {
      type: String,
      default: "",
      trim: true,
    },
    channelLink: {
      type: String,
      default: "",
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
    serviceName: {
      type: String,
      required: [true, "Service name is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["new", "contact", "converted"],
      default: "new",
    },
    finalPrice: {
      type: Number,
      default: null,
    },
    deadline: {
      type: Date,
      default: null,
    },
    projectDescription: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Lead", leadSchema);
