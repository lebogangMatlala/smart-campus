// routes/issueRoutes.js
import express from "express";
import {
  reportIssue,
  getAllIssues,
  updateIssueStatus
} from "../controllers/issueController.js";
import { authenticate, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/reportIssue", authenticate, authorizeRoles("Student", "Lecturer", "Admin"), reportIssue);
router.get("/getAllIssues", authenticate,  authorizeRoles("Admin"), getAllIssues);
router.patch("/updateIssueStatus/:id", authenticate, authorizeRoles("Admin"), updateIssueStatus);

export default router;
