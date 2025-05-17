// controllers/issueController.js
import Issue from "../models/Issue.js";

export const reportIssue = async (req, res) => {
  const { title, description, location } = req.body;
  const userId = req.user?.userId; // not req.user?.id
  console.log("Logged in user ID:", userId);

  if (!userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }

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
    console.error("Issue Reporting Error:", error);
    res.status(500).json({ error: "Failed to report issue", details: error.message });
  }
};
export const getUserIssues = async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  try {
    const issues = await Issue.find({ reportedBy: userId }).populate("reportedBy", "name role");
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch issues" });
  }
}
export const getIssueById = async (req, res) => {
    const { id } = req.params;

    try {
      const issue = await Issue.findById(id).populate("reportedBy", "name role");
      if (!issue) return res.status(404).json({ error: "Issue not found" });

      res.status(200).json(issue);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch issue" });
    }
  }

  export const getIssuesByStatus = async (req, res) => {
    const { status } = req.params;

    try {
      const issues = await Issue.find({ status }).populate("reportedBy", "name role");
      res.status(200).json(issues);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch issues" });
    }
  }
export const getAllIssues = async (req, res) => {
    try {
      const issues = await Issue.find().populate("reportedBy", "name role");
      res.status(200).json(issues);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch issues" });
    }
  };



export const updateIssue = async (req, res) => {
    const { id } = req.params;
    const { status, resolution } = req.body;
  
    try {
      const issue = await Issue.findByIdAndUpdate(
        id,
        { status, resolution },
        { new: true }
      ).populate("reportedBy", "name role");
  
      if (!issue) return res.status(404).json({ error: "Issue not found" });
  
      res.status(200).json(issue);
    } catch (error) {
      res.status(500).json({ error: "Failed to update issue" });
    }
  };

export const deleteIssue = async (req, res) => {
    const { id } = req.params;
  
    try {
      const issue = await Issue.findByIdAndDelete(id);
  
      if (!issue) return res.status(404).json({ error: "Issue not found" });
  
      res.status(200).json({ message: "Issue deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete issue" });
    }
  };





