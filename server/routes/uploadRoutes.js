import express from "express";
import { protect, authorize } from "../middleware/auth.js";
import { uploadPhoto } from "../controllers/imageController.js";

const router = express.Router();
// Want protect and admin for all routes.
// anything below these routes, will use these middlewares.
// this is useful if ALL routes need a specific middleware.
router.use(protect);
router.use(authorize("admin"));

// Will upload an image to the images folder and return a path directory.
router.route("/").post(uploadPhoto);

// Will upload a new resume to data
// router.route('/resume').post('')

export default router;
