import express from "express";
import {
  createProject,
  uploadPhoto,
} from "../controllers/projectController.js";
const router = express.Router();
import { protect, authorize } from "../middleware/auth.js";

// Want protect and admin for all routes.
// anything below these routes, will use these middlewares.
// this is useful if ALL routes need a specific middleware.
router.use(protect);
router.use(authorize("admin"));

router.route("/").post(createProject);
router.route("/:id/photo").put(uploadPhoto);
export default router;
