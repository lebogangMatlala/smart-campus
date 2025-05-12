import Announcement from '../models/Announcement.js';
import mongoose from 'mongoose';
import User from '../models/User.js';

// Create a new announcement
export const createAnnouncement = async (req, res) => {
  try {
    const { title, message, target_role } = req.body;
    const created_by = req.user.id; // assuming you attach user in middleware

    const announcement = new Announcement({ title, message, target_role, created_by });
    await announcement.save();
    res.status(201).json({ success: true, announcement });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get all announcements
export const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ created_at: -1 }).populate('created_by', 'name role');
    res.status(200).json({ success: true, announcements });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get announcement by ID
export const getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id).populate('created_by', 'name role');
    if (!announcement) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, announcement });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete announcement (Admin only)
export const deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) return res.status(404).json({ success: false, message: 'Not found' });

    await announcement.deleteOne();
    res.status(200).json({ success: true, message: 'Announcement deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
