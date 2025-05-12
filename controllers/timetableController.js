import Enrollment from "../models/Enrollment.js";
import Timetable from "../models/Timetable.js";

export const getStudentTimetable = async (req, res) => {
  const { studentId } = req.params;

  try {
    const enrollments = await Enrollment.find({ studentId });

    const courseIds = enrollments.map(e => e.courseId);

    const timetable = await Timetable.find({ courseId: { $in: courseIds } })
      .populate("courseId");

    res.status(200).json(timetable);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch timetable" });
  }
};

export const createTimetableEntry = async (req, res) => {
    const { courseId, dayOfWeek, startTime, endTime, room } = req.body;
  
    try {
      const timetable = new Timetable({
        courseId,
        dayOfWeek,
        startTime,
        endTime,
        room
      });
  
      await timetable.save();
  
      res.status(201).json({ message: "Timetable entry created", timetable });
    } catch (error) {
      res.status(500).json({ error: "Failed to create timetable entry" });
    }
  };
