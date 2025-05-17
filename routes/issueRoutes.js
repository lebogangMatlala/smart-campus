import express from "express";
import {
  reportIssue,
  getAllIssues,
  updateIssue,
  deleteIssue // ✅ Add this
} from "../controllers/issueController.js";

import { authenticate, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/reportIssue", authenticate, authorizeRoles("Student", "Lecturer", "Admin"), reportIssue);
router.get("/getAllIssues", authenticate, authorizeRoles("Admin"), getAllIssues);
router.put("/updateIssue/:id", authenticate, authorizeRoles("Admin"), updateIssue);
router.delete("/deleteIssue/:id", authenticate, authorizeRoles("Admin"), deleteIssue)
export default router;
