import express from "express";
import {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlog,
  getFeaturedBlogs,
} from "../controllers/blogController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();
router.route("/").get(getBlogs);
router.route("/featured").get(getFeaturedBlogs);
router.route("/:id").get(getBlog);
// Want protect and admin for all routes.
// anything below these routes, will use these middlewares.
// this is useful if ALL routes need a specific middleware.
router.use(protect);
router.use(authorize("admin"));

router.route("/").post(createBlog);
router.route("/:id").put(updateBlog).delete(deleteBlog);
export default router;
