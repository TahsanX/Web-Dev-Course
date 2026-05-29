import { Router } from "express";
import type { Request,Response } from "express";
const router = Router();
import { auth } from "../../middleware/auth";
import { createIssueController, getIssuesController, getSingleissue } from "./issue.controller";
router.post("/",auth(),createIssueController)
router.get("/", getIssuesController);
router.get("/:id", getSingleissue);
export const issueRoute = router