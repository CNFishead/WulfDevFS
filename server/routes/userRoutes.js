import express from "express";
import {
  createUser,
} from "../controllers/usersController.js";
import User from "../models/User.js";
import { protect, authorize } from "../middleware/auth.js";
const router = express.Router({ mergeParams: true });

// Want protect and admin for all routes.
// anything below these routes, will use these middlewares.
// this is useful if ALL routes need a specific middleware.
router.use(protect);
router.use(authorize("admin"));

// Advanced results take in a model to query the database, and any populate
// But no populate is needed here.
router.route("/").post(createUser);

export default router;
