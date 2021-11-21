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
  let project = await Bootcamp.findById(req.params.id);
  if (!project) {
    return next(
      new ErrorResponse(`No project found with ID: ${req.params.id}`, 404)
    );
  }
  // Make sure user is admin
  if (req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User: ${req.user.id} is not authorized to update this bootcamp`,
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

/* 
  @Desc:   Uploads a photo for the requested project
  @Route:  POST /api/projects
  @Access: Private/Admin
*/
export const uploadPhoto = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    return next(
      new ErrorResponse(`No Project Found with id: ${req.params.id}`, 404)
    );
  }
  // Make sure user is owner, or admin
  if (req.user.role !== "admin") {
    return next(
      new ErrorResponse(`You are not authorized to update this project`, 401)
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;
  // make sure image is a photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`File is of the wrong type`, 400));
  }
  // Check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `File was too large, please upload an image less than ${process.env.MAX_FILE_UPLOAD} or 1MB`,
        400
      )
    );
  }

  // ***NOTE*** Path.parse() returns a {}, youll need to .name to access {name: String} for slugify
  const fileName = path.parse(file.name);

  // Create custom filename
  file.name =
    slugify(`${fileName.name}`, { lower: true }) +
    `-photo${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(
        new ErrorResponse(`Problem with file being moved to filesystem.`, 500)
      );
    }
    // insert filename into database
    // if you go to (http://localhost:5000/uploads/:filename) itll display the image.
    // In production change localhost to whatever the servername is and itll serve up the image from the uploads
    // folder
    console.log(`${process.env.FILE_UPLOAD_PATH}/${file.name}`);
    try {
      await Project.findByIdAndUpdate(req.params.id, {
        photo: `${process.env.SERVER_NAME}/images/${file.name}`,
      });
      // Tell the client the upload was successful and send back the file sharing link
      res.status(201).json({
        success: true,
        data: `${process.env.FILE_UPLOAD_PATH}/${file.name}`,
      });
    } catch (e) {
      console.log(e);
    }
  });
});
