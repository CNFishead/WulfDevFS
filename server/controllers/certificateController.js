import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "../middleware/async.js";
import Certificate from "../models/Certificate.js";
import path from "path";
import slugify from "slugify";

/*
  @Desc:   Return all Certificates
  @Path:   GET /api/cert
  @Access: Public
*/
export const getCertificates = asyncHandler(async (req, res, next) => {
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};
  const count = await Certificate.countDocuments({ ...keyword });
  const certificates = await Certificate.find({ ...keyword })
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ certificates, page, pages: Math.ceil(count / pageSize) });
});

/*
  @Desc:   Return A single cert
  @Route:  GET /api/cert
  @Access: Private
*/
export const getCertificate = asyncHandler(async (req, res) => {
  try {
    const data = await Certificate.findById(req.params.id);
    if (!data) {
      return res
        .status(400)
        .json({ message: `No Certificate Found with id: ${req.params.id}` });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Cert not found" });
    }
    res.status(500).json({ message: "Server Error" });
  }
});

/* 
  @Desc:   Creates a new certificate in the database
  @Route:  POST /api/cert
  @Access: Private/Admin
*/
export const createCert = asyncHandler(async (req, res, next) => {
  const newCert = await Certificate.create(req.body);
  if (!newCert) {
    return next(
      new ErrorResponse(
        `There was a problem with creating the cert, try again please`,
        400
      )
    );
  }
  res.status(200).json({
    success: true,
    data: newCert,
  });
});

/* 
  @Desc:   Updates a cert in the database
  @Route:  PUT /api/cert/:id
  @Access: Private/Admin
*/
export const updateCert = asyncHandler(async (req, res, next) => {
  // Find the cert from the id
  let cert = await Certificate.findById(req.params.id);
  if (!cert) {
    return next(
      new ErrorResponse(`No cert found with ID: ${req.params.id}`, 404)
    );
  }
  // Make sure user is admin
  if (req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User: ${req.user.id} is not authorized to update this cert`,
        401
      )
    );
  }
  // find and update the cert with the req.body
  cert = await Certificate.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({ success: true, data: cert });
});

/* 
  @Desc:   Updates a cert in the database
  @Route:  PUT /api/cert/:id
  @Access: Private/Admin
*/
export const deleteCert = asyncHandler(async (req, res, next) => {
  // Find the cert from the id
  let cert = await Certificate.findById(req.params.id);
  if (!cert) {
    return next(
      new ErrorResponse(`No cert found with ID: ${req.params.id}`, 404)
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

  // find and update the cert with the req.body
  cert = await Certificate.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true });
});
