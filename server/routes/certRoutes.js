import express from "express";
import {
  createCert,
  deleteCert,
  getCertificate,
  getCertificates,
  updateCert,
  // uploadPhoto,
} from "../controllers/certificateController.js";
import { protect, authorize } from "../middleware/auth.js";
import advancedResults from "../middleware/advancedResults.js";

import Certificate from "../models/Certificate.js";
const router = express.Router();

router.route("/").get(advancedResults(Certificate), getCertificates);
// Want protect and admin for all routes.
// anything below these routes, will use these middlewares.
// this is useful if ALL routes need a specific middleware.
router.use(protect);
router.use(authorize("admin"));

router.route("/").post(createCert);
router.route("/:id").put(updateCert).delete(deleteCert).get(getCertificate);
// router.route("/:id/photo").put(uploadPhoto);
export default router;
