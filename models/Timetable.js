// models/Timetable.js
import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  dayOfWeek: { type: String, required: true }, // e.g., 'Monday'
  startTime: { type: String, required: true }, // e.g., '09:00'
  endTime: { type: String, required: true },   // e.g., '10:30'
  room: { type: String, required: true }
});

export default mongoose.model("Timetable", timetableSchema);
