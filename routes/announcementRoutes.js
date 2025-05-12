import express from "express"; 
import { createAnnouncement, getAllAnnouncements, getAnnouncementById, deleteAnnouncement } from "../controllers/announcementController.js";
import { authenticate, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();
// Create announcement (Admin/Lecturer only)
router.post('/createAnnouncement', authenticate, authorizeRoles("Lecturer", "Admin"), createAnnouncement);
// Get all announcements
router.get('/getAllAnnouncements' , authenticate, authorizeRoles("Student", "Lecturer", "Admin"),getAllAnnouncements);
// Get announcement by ID
router.get('/getAnnouncementById/:id', authenticate, authorizeRoles("Student", "Lecturer", "Admin"),getAnnouncementById);
// Delete announcement
router.delete('/deleteAnnouncement/:id', authenticate, authorizeRoles('Admin'), deleteAnnouncement);

export default router;
