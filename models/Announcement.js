// models/Announcement.js
import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  target_role: { type: String, enum: ['Student', 'Lecturer', 'Admin', 'All'], default: 'All' },
  created_at: { type: Date, default: Date.now }
});

const Announcement = mongoose.model('Announcement', announcementSchema);
export default Announcement;
