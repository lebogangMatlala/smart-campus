import express from "express";
import { enrollStudent, getStudentEnrollments } from "../controllers/enrollmentController.js";
import { authenticate, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/enrollStudent", authenticate, authorizeRoles("Admin"), enrollStudent);
router.get("/getStudentEnrollments/:user_id", authenticate, authorizeRoles("Student", "Lecturer", "Admin"), getStudentEnrollments);
router.get("/getCourseEnrollments/:course_id", authenticate, authorizeRoles("Lecturer", "Admin"), getCourseEnrollments);
router.get("/getAllEnrollments", authenticate, authorizeRoles("Admin"), getAllEnrollments);
router.put("/updateEnrollment/:enrollment_id", authenticate, authorizeRoles("Admin"), updateEnrollment);
router.delete("/deleteEnrollment/:enrollment_id", authenticate, authorizeRoles("Admin"), deleteEnrollment);


export default router;
