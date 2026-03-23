const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  channelName: {
    type: String,
    default: "",
  },
  channelLink: {
    type: String,
    default: "",
  },
  message: {
    type: String,
    required: true,
  },
  serviceName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["new", "contact", "converted"],
    default: "new",
  },
  // For converted clients
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Lead", leadSchema);
