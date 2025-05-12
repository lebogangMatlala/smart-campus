import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  room: {
    type: String,
    required: true
  },
  appointmentType: { type: String, enum: ['room', 'one-on-one'], required: true }, // New field
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  googleEventId: {
    type: String,
    required: false
  },
  status: {
    type: String,
    enum: ['confirmed', 'pending', 'cancelled'],
    default: 'pending'
  },
  googleEventId: {
    type: String,
    required: false
  },
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
