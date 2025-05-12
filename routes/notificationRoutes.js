// routes/notificationRoutes.js
import express from "express";
import {
  sendNotification,
  getMyNotifications,
  markNotificationRead
} from "../controllers/notificationController.js";
import { authenticate, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/sendNotification", , authenticate, authorizeRoles("Admin"), sendNotification);
router.get("/getMyNotifications/me", , authenticate, authorizeRoles("Student", "Lecturer", "Admin"), getMyNotifications);
router.patch("/markNotificationRead/:id", authenticate, authorizeRoles("Student", "Lecturer", "Admin"), markNotificationRead);

export default router;
