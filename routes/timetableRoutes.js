import express from "express";
import {
  getStudentTimetable,
  createTimetableEntry,
  getAllTimetableEntries,
  updateTimetableEntry,
  deleteTimetableEntry,
  getTimetableByCourse,
  getTimetableByDay,
} from "../controllers/timetableController.js";

import { authenticate, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get timetable for a specific student
router.get("/getStudentTimetable/:studentId", authenticate, authorizeRoles("Student", "Lecturer", "Admin"), getStudentTimetable);

// Create a new timetable entry
router.post("/createTimetableEntry", authenticate, authorizeRoles("Admin", "Lecturer"), createTimetableEntry);

// Get all timetable entries
router.get("/getAllTimetableEntries", authenticate, authorizeRoles("Admin", "Lecturer"), getAllTimetableEntries);

// Update timetable entry by ID
router.put("/updateTimetableEntry/:id", authenticate, authorizeRoles("Admin", "Lecturer"), updateTimetableEntry);

// Delete timetable entry by ID
router.delete("/deleteTimetableEntry/:id", authenticate, authorizeRoles("Admin", "Lecturer"), deleteTimetableEntry);

// Get timetable by course ID
router.get("/getTimetableByCourse/:courseId", authenticate, authorizeRoles("Admin", "Lecturer"), getTimetableByCourse);

// Get timetable by day of the week
router.get("/getTimetableByDay/:dayOfWeek", authenticate, authorizeRoles("Admin", "Lecturer", "Student"), getTimetableByDay);

export default router;


