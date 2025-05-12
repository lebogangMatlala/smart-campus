const User = require("../models/User");
const Booking = require("../models/Booking");


export const getAdminSummary = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const students = await User.countDocuments({ role: "Student" });
    const lecturers = await User.countDocuments({ role: "Lecturer" });
    const admins = await User.countDocuments({ role: "Admin" });

    const totalBookings = await Booking.countDocuments();
    const totalCourses = await Course.countDocuments();

    const totalIssues = await Maintenance.countDocuments();
    const resolvedIssues = await Maintenance.countDocuments({ status: "Resolved" });

    const recentBookings = await Booking.find().sort({ createdAt: -1 }).limit(5);
    const recentIssues = await Maintenance.find().sort({ createdAt: -1 }).limit(5);

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
    res.status(500).json({ error: "Failed to fetch admin summary" });
  }
};


