import express from "express";
import { getAllCourses, createCourse } from "../controllers/courseController.js";
import { authenticate, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get("/getAllCourses", authenticate, authorizeRoles("Student", "Lecturer", "Admin"), getAllCourses);
router.post("/createCourse",  authenticate, authorizeRoles("Admin"), createCourse);

export default router;
