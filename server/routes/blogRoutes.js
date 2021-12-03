import express from "express";
import {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlog,
} from "../controllers/blogController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();
router.route("/").get(getBlogs);
// Want protect and admin for all routes.
// anything below these routes, will use these middlewares.
// this is useful if ALL routes need a specific middleware.
router.use(protect);
router.use(authorize("admin"));

router.route("/").post(createBlog);
router.route("/:id").put(updateBlog).delete(deleteBlog).get(getBlog);
export default router;
