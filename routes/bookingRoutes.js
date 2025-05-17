import express from "express";
import { createBooking, getBooking, updateBooking, deleteBooking,getAllBookings,getBookingsByUserId } from "../controllers/bookingController.js";
import { authenticate, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a booking
router.post("/createBooking", authenticate, authorizeRoles("Student", "Lecturer", "Admin"), createBooking);

// Get a booking by ID
router.get("/getBooking/:id", authenticate, authorizeRoles("Student", "Lecturer", "Admin"), getBooking);

// ✅ Add this route
router.get("/getBookingsByUserId/:userId", authenticate, authorizeRoles("Student", "Lecturer", "Admin"), getBookingsByUserId);

// Update a booking by ID
router.put("/updateBooking/:id", authenticate, authorizeRoles("Student", "Lecturer", "Admin"), updateBooking);

// Delete a booking by ID
router.delete("/deleteBooking/:id", authenticate, authorizeRoles("Admin"), deleteBooking);

// Get all bookings
router.get("/getAllBookings", authenticate, authorizeRoles("Admin"), getAllBookings);
export default router;

