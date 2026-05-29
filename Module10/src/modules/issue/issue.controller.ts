import type { Request, Response } from "express";
import {
  createIssueService,
  deleteSingleUserFromDB,
  getIssuesService,
  getSingleUserFromDB,
} from "./issue.service.js";

export const createIssueController = async (req: Request, res: Response) => {
  const { title, description, type } = req.body;
  if (
    typeof title !== "string" ||
    title.trim().length === 0 ||
    typeof description !== "string" ||
    description.length < 20 ||
    typeof type !== "string" ||
    !["bug", "feature_request"].includes(type)
  ) {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors:
        "Title/Description non-empty strings. Type must be 'bug' or 'feature_request'.",
    });
  }

  try {
    const reporterId = (req as any).user!.id;
    const newIssue = await createIssueService({
      title,
      description,
      type: type as "bug" | "feature_request",
      reporterId,
    });

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
      errors:
        error instanceof Error ? error.message : "Unexpected database error",
    });
  }
};
export const getIssuesController = async (req: Request, res: Response) => {
  const { sort = "newest", type, status } = req.query;

  try {
    const issues = await getIssuesService({ sort, type, status });
    return res.status(200).json({
      success: true,
      message: "Issues retrived successfully",
      data: issues,
    });
  } catch (error: unknown) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Database Error",
        errors:
          error instanceof Error ? error.message : "Unexpected database error",
      });
  }
};
export const getSingleissue = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { success, properresult } = await getSingleUserFromDB(id as string);
    if (success === false) {
      return res.status(404).json({
        success: false,
        message: "Not Found",
        error: "Issue Not found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Issue retrived successfully!",
      data: properresult,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};
export const deleteSingleissue = async (req: Request, res: Response) => {
  const { id } = req.params;
  if ((req as any).user.role === "contributor") {
    return res.status(403).json({
      success: false,
      message: "Forbidden",
      error: "Valid token but insufficient role/permissions",
    });
  } else {
    try {
      const result = await deleteSingleUserFromDB(
        id as string,
      );
      if (result.rowCount === 0) {
        return res.status(404).json({
          success: false,
          message: "Issue Not found!",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Issue deleted successfully!",
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
        error: error,
      });
    }
  }
};
