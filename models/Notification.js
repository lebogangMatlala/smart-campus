const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  message: String,
  audience: { type: String, enum: ["all", "students", "lecturers"], default: "all" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Notification", NotificationSchema);
