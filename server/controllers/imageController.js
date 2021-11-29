import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "../middleware/async.js";
import path from "path";
import slugify from "slugify";
import sharp from "sharp";

/* 
  @Desc:   Uploads a photo to the images folder
  @Route:  POST /api/projects
  @Access: Private/Admin
*/
export const uploadPhoto = asyncHandler(async (req, res, next) => {
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

  file.mv(
    `${process.env.FILE_UPLOAD_PATH}/images/${file.name}`,
    async (err) => {
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
      console.log(`${process.env.FILE_UPLOAD_PATH}/images/${file.name}`);
      try {
        // Tell the client the upload was successful and send back the file sharing link
        res.status(201).json({
          success: true,
          data: `images/${file.name}`,
        });
      } catch (e) {
        console.log(e);
      }
    }
  );
});
