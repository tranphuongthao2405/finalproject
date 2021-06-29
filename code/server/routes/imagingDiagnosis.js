const express = require("express");
const router = express.Router();
const imagingController = require("../controllers/imagingDiagnosis");
const { auth } = require("../middleware/auth");

router.post("/saveImage", auth, imagingController.saveImage);

router.post("/uploadImage", auth, imagingController.uploadImage);

router.post(
  "/getImagingDiagnosisById",
  auth,
  imagingController.getImagingDiagnosisById
);

module.exports = router;
