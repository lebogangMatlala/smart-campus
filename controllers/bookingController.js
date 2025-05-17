import Booking from "../models/Booking.js";
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();


export const createBooking = async (req, res) => {
  const { userId, room, startTime, endTime, appointmentType } = req.body;

  // Validate appointment type
  if (!['room', 'one-on-one'].includes(appointmentType)) {
    return res.status(400).json({ error: "Invalid appointment type" });
  }

  try {
    let newBooking;

    if (appointmentType === 'room') {
      if (!room) {
        return res.status(400).json({ error: "Room is required for room bookings" });
      }

      // ❗ Check for conflicts with existing bookings
      const conflict = await Booking.findOne({
        room,
        startTime: { $lt: new Date(endTime) },
        endTime: { $gt: new Date(startTime) }
      });

      if (conflict) {
        return res.status(409).json({ error: "Room already booked for this time slot" });
      }

      // No conflict, create booking
      newBooking = new Booking({
        userId,
        room,
        appointmentType,
        startTime,
        endTime
      });

    } else {
      // One-on-one appointment (you may add conflict check here too if needed)
      newBooking = new Booking({
        userId,
        appointmentType,
        startTime,
        endTime
      });
    }

    await newBooking.save();
    res.status(201).json(newBooking);

  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Failed to create booking" });
  }
};

// Get a booking by ID
export const getBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ error: "Failed to fetch booking" });
  }
};

// Update a booking and update Google Calendar
export const updateBooking = async (req, res) => {
  const { id } = req.params;
  const { room, startTime, endTime, status } = req.body;

  try {
    // Find the booking
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Update booking in DB
    booking.room = room || booking.room;
    booking.startTime = startTime || booking.startTime;
    booking.endTime = endTime || booking.endTime;
    booking.status = status || booking.status;

    await booking.save();
    res.status(200).json(booking);
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ error: "Failed to update booking" });
  }
};

// Delete a booking and remove it from Google Calendar
export const deleteBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Delete the booking from DB
    await booking.remove();

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ error: "Failed to delete booking" });
  }
};

// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

// Get bookings by user ID
export const getBookingsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const bookings = await Booking.find({ userId });
    if (!bookings.length) {
      return res.status(404).json({ error: "No bookings found for this user" });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings by user ID:", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

// Get bookings by room


