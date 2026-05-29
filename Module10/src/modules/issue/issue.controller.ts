import type { Request, Response } from "express";
import {
  createIssueService,
  deleteSingleUserFromDB,
  getIssuesService,
  getSingleUserFromDB,
  SingleUpdateissuefromDB,
  updateIssueService,
} from "./issue.service.js";
import type { IUpdateIssue } from "./issue.interface";
import { successResponse, errorResponse, errorsResponse } from "../../utils/responseHandler";

export const createIssueController = async (req: Request, res: Response) => {
  const { title, description, type } = req.body;
  if (
    typeof title !== "string" || title.trim().length === 0 ||
    typeof description !== "string" || description.length < 20 ||
    typeof type !== "string" || !["bug", "feature_request"].includes(type)
  ) {
    return errorsResponse(res, 400, "Validation Error", "Title/Description non-empty strings. Type must be 'bug' or 'feature_request'.");
  }

  try {
    const reporterId = req.user?.id;
    const newIssue = await createIssueService({ title, description, type: type as "bug" | "feature_request", reporterId });
    return successResponse(res, 201, "Issue created successfully!", newIssue);
  } catch (error: unknown) {
    return errorsResponse(res, 500, "Failed to create issue", error instanceof Error ? error.message : "Unexpected database error");
  }
};

export const getIssuesController = async (req: Request, res: Response) => {
  const { sort = "newest", type, status } = req.query;
  try {
    const issues = await getIssuesService({ sort: sort as string, type: type as string, status: status as string });
    return successResponse(res, 200, "Issues retrived successfully", issues);
  } catch (error: unknown) {
    return errorsResponse(res, 500, "Database Error", error instanceof Error ? error.message : "Unexpected database error");
  }
};

export const getSingleissue = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { success, properresult } = await getSingleUserFromDB(id as string);
    if (!success) {
      return errorResponse(res, 404, "Not Found", "Issue Not found!");
    }
    return successResponse(res, 200, "Issue retrived successfully!", properresult);
  } catch (error: any) {
    return errorResponse(res, 500, error.message, error);
  }
};

export const updateIssueController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, type } = req.body;
  const user = req.user;
  
  if (!title && !description && !type) {
    return errorsResponse(res, 400, "Validation Error", "At least one field is required");
  }

  if (
    (title !== undefined && (typeof title !== "string" || title.trim().length === 0)) ||
    (description !== undefined && (typeof description !== "string" || description.length < 20)) ||
    (type !== undefined && (typeof type !== "string" || !["bug", "feature_request"].includes(type)))
  ) {
    return errorsResponse(res, 400, "Validation Error", "Invalid data provided.");
  }

  try {
    const result = await SingleUpdateissuefromDB(id as string);
    if (result.rowCount === 0) {
      return errorResponse(res, 404, "Not Found", "Issue not found!");
    }

    if (user && user.role === "contributor") {
      if (result.rows[0].reporter_id !== user.id || result.rows[0].status !== "open") {
        return errorResponse(res, 403, "Forbidden", "Contributors can only update their own issues with 'open' status");
      }
    }

    const updateData: IUpdateIssue = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (type !== undefined) updateData.type = type;

    const updatedIssue = await updateIssueService(id as string, updateData);
    if (updatedIssue.rowCount === 0) {
      return errorResponse(res, 404, "Not Found", "Issue Not found");
    }
    return successResponse(res, 200, "Issue updated successfully!", updatedIssue.rows[0]);
  } catch (error: any) {
    return errorResponse(res, 500, error.message, error);
  }
};

export const deleteSingleissue = async (req: Request, res: Response) => {
  const { id } = req.params;
  if ((req as any).user.role === "contributor") {
    return errorResponse(res, 403, "Forbidden", "Insufficient permissions");
  }
  try {
    const result = await deleteSingleUserFromDB(id as string);
    if (result.rowCount === 0) {
      return errorResponse(res, 404, "Not Found", "Issue Not found!");
    }
    return successResponse(res, 204, "Issue deleted successfully!", null);
  } catch (error: any) {
    return errorResponse(res, 500, error.message, error);
  }
};