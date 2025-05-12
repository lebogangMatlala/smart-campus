import express from "express";
import { enrollStudent, getStudentEnrollments } from "../controllers/enrollmentController.js";
import { authenticate, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/enrollStudent", authenticate, authorizeRoles("Admin"), enrollStudent);
router.get("/getStudentEnrollments/:user_id", authenticate, authorizeRoles("Student", "Lecturer", "Admin"), getStudentEnrollments);

export default router;
