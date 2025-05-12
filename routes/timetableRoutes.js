import express from "express";
import { getStudentTimetable,createTimetableEntry } from "../controllers/timetableController.js";
import { authenticate, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get("/getStudentTimetable/:studentId", authenticate, authorizeRoles("Student", "Lecturer", "Admin"), getStudentTimetable);
router.post("/createTimetableEntry",  authenticate,authorizeRoles("Admin", "Lecturer"), createTimetableEntry);
export default router;


