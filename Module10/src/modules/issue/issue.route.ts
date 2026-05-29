import { Router } from "express";
const router = Router();
import { auth } from "../../middleware/auth";
import { createIssueController, deleteSingleissue, getIssuesController, getSingleissue, updateIssueController } from "./issue.controller";
router.post("/",auth(),createIssueController)
router.get("/", getIssuesController);
router.get("/:id", getSingleissue);
router.patch("/:id", auth(), updateIssueController);
router.delete("/:id", auth(),deleteSingleissue);
export const issueRoute = router