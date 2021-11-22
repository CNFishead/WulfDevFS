import express from "express";
import { createExp, deleteExp, getExp, getExps, updateExp } from "../controllers/expController.js";
import { protect, authorize } from "../middleware/auth.js";
import advancedResults from "../middleware/advancedResults.js";
import Experience from "../models/Experience.js";
const router = express.Router();

router.route("/").get(advancedResults(Experience), getExps);
// Want protect and admin for all routes.
// anything below these routes, will use these middlewares.
// this is useful if ALL routes need a specific middleware.
router.use(protect);
router.use(authorize("admin"));

router.route("/").post(createExp);
router.route("/:id").put(updateExp).delete(deleteExp).get(getExp);

export default router;
