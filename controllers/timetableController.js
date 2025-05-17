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
export const getAllTimetableEntries = async (req, res) => {
    try {
      const timetableEntries = await Timetable.find().populate("courseId");
      res.status(200).json(timetableEntries);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch timetable entries" });
    }
  };
export const updateTimetableEntry = async (req, res) => {
    const { id } = req.params;
    const { courseId, dayOfWeek, startTime, endTime, room } = req.body;
  
    try {
      const updatedEntry = await Timetable.findByIdAndUpdate(
        id,
        { courseId, dayOfWeek, startTime, endTime, room },
        { new: true }
      );
  
      if (!updatedEntry) {
        return res.status(404).json({ error: "Timetable entry not found" });
      }
  
      res.status(200).json(updatedEntry);
    } catch (error) {
      res.status(500).json({ error: "Failed to update timetable entry" });
    }
  };

export const deleteTimetableEntry = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedEntry = await Timetable.findByIdAndDelete(id);
  
      if (!deletedEntry) {
        return res.status(404).json({ error: "Timetable entry not found" });
      }
  
      res.status(200).json({ message: "Timetable entry deleted" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete timetable entry" });
    }
  };

export const getTimetableByCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    const timetable = await Timetable.find({ courseId }).populate("courseId");

    if (!timetable) {
      return res.status(404).json({ message: "Timetable not found" });
    }

    res.status(200).json(timetable);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch timetable" });
  }
}

export const getTimetableByDay = async (req, res) => {
  const { dayOfWeek } = req.params;

  try {
    const timetable = await Timetable.find({ dayOfWeek }).populate("courseId");

    if (!timetable) {
      return res.status(404).json({ message: "Timetable not found" });
    }

    res.status(200).json(timetable);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch timetable" });
  }
}

  
