import express from "express";
import { getAdminSummary } from "../controllers/adminController.js";
import { authenticate, authorizeRoles } from '../middleware/authMiddleware.js';


const router = express.Router();

router.get("/summary", authenticate, authorizeRoles("Admin"), getAdminSummary);

export default router;
