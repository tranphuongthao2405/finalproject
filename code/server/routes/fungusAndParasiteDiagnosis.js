const express = require("express");
const router = express.Router();
const FungusAndParasiteController = require("../controllers/fungusAndParasiteDiagnosis");
const { auth } = require("../middleware/auth");

router.post(
  "/saveFungusAndParasiteForm",
  auth,
  FungusAndParasiteController.saveFungusAndParasiteForm
);

router.post(
  "/getFungusDiagnosisById",
  auth,
  FungusAndParasiteController.getFungusDiagnosisById
);

module.exports = router;
