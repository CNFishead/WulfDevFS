import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "../middleware/async.js";
import Project from "../models/Project.js";
import path from "path";
import slugify from "slugify";

/*
  @Desc:   Return All projects
  @Route:  GET /api/projects
  @Access: Public
*/
export const getProjects = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

/*
  @Desc:   Return A single project
  @Route:  GET /api/projects
  @Access: Private
*/
export const getProject = asyncHandler(async (req, res, next) => {
  const data = await Project.findById(req.params.id);
  if (!data) {
    return next(
      // Correctly formatted, but not in the database
      new ErrorResponse(`No Project Found with id: ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: data });
});

/* 
  @Desc:   Creates a new project in the database
  @Route:  POST /api/projects
  @Access: Private/Admin
*/
export const createProject = asyncHandler(async (req, res, next) => {
  const newProject = await Project.create(req.body);
  if (!newProject) {
    return next(
      new ErrorResponse(
        `There was a problem with creating the project, try again please`,
        400
      )
    );
  }
  res.status(200).json({
    success: true,
    data: newProject,
  });
});

/* 
  @Desc:   Updates a project in the database
  @Route:  PUT /api/projects/:id
  @Access: Private/Admin
*/
export const updateProject = asyncHandler(async (req, res, next) => {
  // Find the project from the id
  let project = await Project.findById(req.params.id);
  if (!project) {
    return next(
      new ErrorResponse(`No project found with ID: ${req.params.id}`, 404)
    );
  }
  // Make sure user is admin
  if (req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User: ${req.user.id} is not authorized to update this project`,
        401
      )
    );
  }
  // find and update the project with the req.body
  project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({ success: true, data: project });
});

/* 
  @Desc:   Updates a project in the database
  @Route:  PUT /api/projects/:id
  @Access: Private/Admin
*/
export const deleteProject = asyncHandler(async (req, res, next) => {
  // Find the project from the id
  let project = await Project.findById(req.params.id);
  if (!project) {
    return next(
      new ErrorResponse(`No project found with ID: ${req.params.id}`, 404)
    );
  }
  // Make sure user is admin
  if (req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User: ${req.user.id} is not authorized to delete This project`,
        401
      )
    );
  }

  // find and update the project with the req.body
  project = await Project.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true });
});
