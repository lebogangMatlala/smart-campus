import express from "express";
import { createBooking, getBooking, updateBooking, deleteBooking } from "../controllers/bookingController.js";
import { authenticate, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a booking
router.post("/createBooking", authenticate, authorizeRoles("Student", "Lecturer", "Admin"), createBooking);

// Get a booking by ID
router.get("/getBooking/:id", authenticate, authorizeRoles("Student", "Lecturer", "Admin"), getBooking);

// Update a booking by ID
router.put("/updateBooking/:id", authenticate, authorizeRoles("Student", "Lecturer", "Admin"), updateBooking);

// Delete a booking by ID
router.delete("/deleteBooking/:id", authenticate, authorizeRoles("Admin"), deleteBooking);

export default router;

