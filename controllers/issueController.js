// controllers/issueController.js
import Issue from "../models/Issue.js";

export const reportIssue = async (req, res) => {
  const { title, description, location } = req.body;
  const userId = req.user.id;

  try {
    const issue = new Issue({
      title,
      description,
      location,
      reportedBy: userId
    });

    await issue.save();
    res.status(201).json({ message: "Issue reported successfully", issue });
  } catch (error) {
    res.status(500).json({ error: "Failed to report issue" });
  }
};
export const getAllIssues = async (req, res) => {
    try {
      const issues = await Issue.find().populate("reportedBy", "name role");
      res.status(200).json(issues);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch issues" });
    }
  };
  export const updateIssueStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      const issue = await Issue.findByIdAndUpdate(id, { status }, { new: true });
      if (!issue) return res.status(404).json({ error: "Issue not found" });
  
      res.status(200).json({ message: "Issue updated", issue });
    } catch (error) {
      res.status(500).json({ error: "Failed to update issue" });
    }
  };
  
