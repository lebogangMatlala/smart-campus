import Course from "../models/Course.js";

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve courses" });
  }
};

export const createCourse = async (req, res) => {
  try {
    const { name, description } = req.body;
    const course = new Course({ name, description });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: "Failed to create course" });
  }
};
export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve course" });
  }
}

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const course = await Course.findByIdAndUpdate(id, { name, description }, { new: true });
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ message: "Failed to update course" });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.status(200).json({ message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete course" });
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


