import Booking from "../models/Booking.js";
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

// Initialize OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const calendar = google.calendar({ version: "v3", auth: oauth2Client });

// Create a booking and add it to Google Calendar
// Create a booking
export const createBooking = async (req, res) => {
    const { userId, room, startTime, endTime, appointmentType } = req.body;
  
    // Ensure that appointmentType is valid
    if (!['room', 'one-on-one'].includes(appointmentType)) {
      return res.status(400).json({ error: "Invalid appointment type" });
    }
  
    try {
      let newBooking;
  
      if (appointmentType === 'room') {
        // Room booking
        if (!room) {
          return res.status(400).json({ error: "Room is required for room bookings" });
        }
        newBooking = await Booking.create({
          userId,
          room,
          appointmentType,
          startTime,
          endTime
        });
      } else {
        // One-on-one appointment
        newBooking = await Booking.create({
          userId,
          appointmentType,
          startTime,
          endTime
        });
      }
  
      // Create event in Google Calendar
    //   const event = {
    //     summary: appointmentType === 'room' ? `Booking for ${room}` : `One-on-one Appointment`,
    //     description: appointmentType === 'room' ? `Booking for ${room}` : `One-on-one Appointment with User ${userId}`,
    //     start: {
    //       dateTime: startTime,
    //       timeZone: "Africa/Johannesburg",
    //     },
    //     end: {
    //       dateTime: endTime,
    //       timeZone: "Africa/Johannesburg",
    //     },
    //   };
  
    //   const calendarEvent = await calendar.events.insert({
    //     calendarId: "primary", // or specify a different calendar ID
    //     resource: event,
    //   });
  
      // Store the Google Calendar Event ID in the database
      //newBooking.googleEventId = calendarEvent.data.id;
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

    // Update Google Calendar event
    // const updatedEvent = {
    //   summary: `Updated Booking for ${room || booking.room}`,
    //   description: `Updated booking for ${room || booking.room}`,
    //   start: {
    //     dateTime: startTime || booking.startTime,
    //     timeZone: "Africa/Johannesburg",
    //   },
    //   end: {
    //     dateTime: endTime || booking.endTime,
    //     timeZone: "Africa/Johannesburg",
    //   },
    // };

    // await calendar.events.update({
    //   calendarId: "primary", // specify the correct calendar ID
    //   eventId: booking.googleEventId,
    //   resource: updatedEvent,
    // });

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

    // Delete the Google Calendar event
    // await calendar.events.delete({
    //   calendarId: 'primary', // specify the correct calendar ID
    //   eventId: booking.googleEventId,
    // });

    // Delete the booking from DB
    await booking.remove();

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ error: "Failed to delete booking" });
  }
};
