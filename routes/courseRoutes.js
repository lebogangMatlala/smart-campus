import express from "express";
import {
  getAllCourses,
  createCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
  getCourseEnrollments
} from "../controllers/courseController.js";

import { authenticate, authorizeRoles } from "../middleware/authMiddleware.js";


const router = express.Router();

// GET all courses (accessible by Student, Lecturer, Admin)
router.get("/getAllCourses", authenticate, authorizeRoles("Student", "Lecturer", "Admin"), getAllCourses);

// POST create course (Admin only)
router.post("/createCourse", authenticate, authorizeRoles("Admin"), createCourse);

// GET course by ID
router.get("/getCourse/:id", authenticate, authorizeRoles("Student", "Lecturer", "Admin"), getCourseById);

// PUT update course by ID
router.put("/updateCourse/:id", authenticate, authorizeRoles("Admin"), updateCourse);

// DELETE course by ID
router.delete("/deleteCourse/:id", authenticate, authorizeRoles("Admin"), deleteCourse);

// GET enrollments for a course
router.get("/getCourseEnrollments/:course_id/enrollments", authenticate, authorizeRoles("Lecturer", "Admin"), getCourseEnrollments);

export default router;

