import express from "express";
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
  uploadPhoto,
} from "../controllers/projectController.js";
import { protect, authorize } from "../middleware/auth.js";
import advancedResults from "../middleware/advancedResults.js";
import Project from "../models/Project.js";
const router = express.Router();

router.route("/").get(advancedResults(Project), getProjects);
// Want protect and admin for all routes.
// anything below these routes, will use these middlewares.
// this is useful if ALL routes need a specific middleware.
router.use(protect);
router.use(authorize("admin"));

router.route("/").post(createProject);
router.route("/:id").put(updateProject).delete(deleteProject).get(getProject);
router.route("/:id/photo").put(uploadPhoto);
export default router;
