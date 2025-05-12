import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Course from "../models/Course.js";
import Issue from "../models/Issue.js"; // Corrected the import (used singular form based on common convention)

export const getAdminSummary = async (req, res) => {
  try {
    // Count Users by Role
    const totalUsers = await User.countDocuments();
    const students = await User.countDocuments({ role: "Student" });
    const lecturers = await User.countDocuments({ role: "Lecturer" });
    const admins = await User.countDocuments({ role: "Admin" });

    // Count Bookings and Courses
    const totalBookings = await Booking.countDocuments();
    const totalCourses = await Course.countDocuments();

    // Count Issues and Resolved Issues
    const totalIssues = await Issue.countDocuments();
    const resolvedIssues = await Issue.countDocuments({ status: "Resolved" });

    // Get recent bookings and issues
    const recentBookings = await Booking.find().sort({ createdAt: -1 }).limit(5);
    const recentIssues = await Issue.find().sort({ createdAt: -1 }).limit(5);

    // Respond with summary
    res.status(200).json({
      users: { total: totalUsers, students, lecturers, admins },
      bookings: totalBookings,
      courses: totalCourses,
      maintenance: { total: totalIssues, resolved: resolvedIssues },
      recentActivity: {
        bookings: recentBookings,
        issues: recentIssues
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch admin summary" });
  }
};

