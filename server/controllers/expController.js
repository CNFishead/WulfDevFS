import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "../middleware/async.js";
import Experience from "../models/Experience.js";

/*
  @Desc:   Return All Experiences
  @Route:  GET /api/exp
  @Access: Public
*/
export const getExps = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

/*
  @Desc:   Return A single Experience
  @Route:  GET /api/exp/:id
  @Access: Private
*/
export const getExp = asyncHandler(async (req, res, next) => {
  const data = await Experience.findById(req.params.id);
  if (!data) {
    return next(
      // Correctly formatted, but not in the database
      new ErrorResponse(`No Experience Found with id: ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: data });
});

/* 
  @Desc:   Creates a new Experience in the database
  @Route:  POST /api/exp
  @Access: Private/Admin
*/
export const createExp = asyncHandler(async (req, res, next) => {
  const newExp = await Experience.create(req.body);
  if (!newExp) {
    return next(
      new ErrorResponse(
        `There was a problem with creating the Experience, try again please`,
        400
      )
    );
  }
  res.status(200).json({
    success: true,
    data: newExp,
  });
});

/* 
  @Desc:   Updates a Experience in the database
  @Route:  PUT /api/exp/:id
  @Access: Private/Admin
*/
export const updateExp = asyncHandler(async (req, res, next) => {
  // Find the Experience from the id
  let exp = await Experience.findById(req.params.id);
  if (!exp) {
    return next(
      new ErrorResponse(`No Experience found with ID: ${req.params.id}`, 404)
    );
  }
  // Make sure user is admin
  if (req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User: ${req.user.id} is not authorized to update this Experience`,
        401
      )
    );
  }
  // find and update the Experience with the req.body
  exp = await Experience.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({ success: true, data: exp });
});

/* 
  @Desc:   Updates a Experience in the database
  @Route:  PUT /api/exp/:id
  @Access: Private/Admin
*/
export const deleteExp = asyncHandler(async (req, res, next) => {
  // Find the Experience from the id
  let exp = await Experience.findById(req.params.id);
  if (!exp) {
    return next(
      new ErrorResponse(`No Experience found with ID: ${req.params.id}`, 404)
    );
  }
  // Make sure user is admin
  if (req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User: ${req.user.id} is not authorized to delete This Experience`,
        401
      )
    );
  }

  // find and update the Experience with the req.body
  exp = await Experience.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true });
});
