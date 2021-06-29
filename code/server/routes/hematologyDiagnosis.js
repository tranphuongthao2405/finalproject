const express = require("express");
const router = express.Router();
const HematologyController = require("../controllers/hematologyDiagnosis");
const { auth } = require("../middleware/auth");

router.post(
  "/saveHematologyForm",
  auth,
  HematologyController.saveHematologyForm
);

router.post(
  "/getHematologyDiagnosisById",
  auth,
  HematologyController.getHematologyDiagnosisById
);

module.exports = router;
