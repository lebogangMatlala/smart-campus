import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import User from "../models/User.js";

export const enrollStudent = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    // Validate existence
    const student = await User.findById(studentId);
    const course = await Course.findById(courseId);
    if (!student || !course) {
      return res.status(404).json({ message: "Student or Course not found" });
    }

    const alreadyEnrolled = await Enrollment.findOne({ studentId, courseId });
    if (alreadyEnrolled) {
      return res.status(400).json({ message: "Student already enrolled in course" });
    }

    const enrollment = new Enrollment({ studentId, courseId });
    await enrollment.save();
    res.status(201).json(enrollment);
  } catch (err) {
    res.status(500).json({ message: "Enrollment failed" });
  }
};

export const getStudentEnrollments = async (req, res) => {
  try {
    const { user_id } = req.params;
    const enrollments = await Enrollment.find({ studentId: user_id }).populate("courseId");
    res.status(200).json(enrollments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch enrollments" });
  }
};
export const getCourseEnrollments = async (req, res) => {
  try {
    const { course_id } = req.params;
    const enrollments = await Enrollment.find({ courseId: course_id }).populate("studentId");
    res.status(200).json(enrollments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch enrollments" });
  }
};

export const deleteEnrollment = async (req, res) => {
  try {
    const { enrollment_id } = req.params;
    const enrollment = await Enrollment.findByIdAndDelete(enrollment_id);
    if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });
    res.status(200).json({ message: "Enrollment deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete enrollment" });
  }
};

export const updateEnrollment = async (req, res) => {
  try {
    const { enrollment_id } = req.params;
    const { courseId, studentId } = req.body;
    const enrollment = await Enrollment.findByIdAndUpdate(enrollment_id, { courseId, studentId }, { new: true });
    if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });
    res.status(200).json(enrollment);
  } catch (err) {
    res.status(500).json({ message: "Failed to update enrollment" });
  }
};

export const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find().populate("studentId").populate("courseId");
    res.status(200).json(enrollments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch enrollments" });
  }
};

