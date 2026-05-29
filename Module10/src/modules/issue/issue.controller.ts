import type { Request, Response } from "express";
import { createIssueService } from "./issue.service.js";

export const createIssueController = async (req: Request, res: Response) => {
  const { title, description, type } = req.body;
  if (
    typeof title !== "string" || title.trim().length === 0 ||
    typeof description !== "string" || description.length <20 ||
    typeof type !== "string" || !["bug", "feature_request"].includes(type)
  ) {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: "Title/Description non-empty strings. Type must be 'bug' or 'feature_request'.",
    });
  }

  try {
    const reporterId = (req as any).user!.id
    const newIssue = await createIssueService({ title, description, type: type as 'bug' | 'feature_request', reporterId });

    return res.status(201).json({
      success: true,
      message: "Issue created successfully!",
      data: newIssue,
    });
  } catch (error: unknown) {
    console.error("Error saving issue:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create issue",
      errors: error instanceof Error ? error.message : "Unexpected database error",
    });
  }
};