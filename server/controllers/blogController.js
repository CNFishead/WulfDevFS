import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "../middleware/async.js";
import Blog from "../models/Blog.js";

/*
  @Desc:   Return all blogs
  @Path:   GET /api/blog
  @Access: Public
*/
export const getBlogs = asyncHandler(async (req, res, next) => {
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;
  // Checks if a keyword is passed in,
  // if it is, it sets the query to query the selected field,
  // case insensitive.
  const keyword = req.query.keyword
    ? { title: { $regex: req.query.keyword, $options: "i" } }
    : {};
  const count = await Blog.countDocuments({ ...keyword });
  const blogs = await Blog.find({ ...keyword })
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ blogs, page, pages: Math.ceil(count / pageSize) });
});

/*
  @Desc:   Create Blog Article
  @Path:   POST /api/blog
  @Access: Private
*/
export const createBlog = asyncHandler(async (req, res, next) => {
  try {
    const newBlog = await Blog.create(req.body);
    if (!newBlog) {
      return res.status(400).json({
        message: `There was a problem with creating the blog, try again`,
      });
    }
    res.status(200).json(newBlog);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Something went wrong on the server ${error.message}` });
  }
});

/*
  @Desc:   Return a blog
  @Path:   GET /api/blog/:id
  @Access: Private
*/
export const getBlog = asyncHandler(async (req, res, next) => {
  const data = await Blog.findById(req.params.id);
  if (!data) {
    return next(
      // Correctly formatted, but not in the database
      new ErrorResponse(`No Blog Found with id: ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: data });
});
/*
  @Desc:   Delete a single blog article
  @Path:   DELETE /api/blog/:id
  @Access: Public
*/
export const deleteBlog = asyncHandler(async (req, res, next) => {
  // Find the blog from the id
  let blog = await Blog.findById(req.params.id);
  if (!blog) {
    return next(
      new ErrorResponse(`No blog found with ID: ${req.params.id}`, 404)
    );
  }
  // Make sure user is admin
  if (req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User: ${req.user.id} is not authorized to delete This cert`,
        401
      )
    );
  }

  // find and update the blog with the req.body
  blog = await Blog.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true });
});

/*
  @Desc:   Update blog in database
  @Path:   PUT /api/blog/:id
  @Access: Public
*/
export const updateBlog = asyncHandler(async (req, res, next) => {
  // Find the blog from the id
  let blog = await Blog.findById(req.params.id);
  if (!blog) {
    return next(
      new ErrorResponse(`No blog found with ID: ${req.params.id}`, 404)
    );
  }
  // Make sure user is admin
  if (req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User: ${req.user.id} is not authorized to update this blog`,
        401
      )
    );
  }
  // find and update the blog with the req.body
  blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({ success: true, data: blog });
});
