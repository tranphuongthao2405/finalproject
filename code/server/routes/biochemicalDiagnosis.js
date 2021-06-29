const express = require("express");
const biochemicalController = require("../controllers/biochemicalDiagnosis");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.post(
  "/saveBiochemicalForm",
  auth,
  biochemicalController.saveBiochemicalForm
);

router.post(
  "/getBiochemicalDiagnosisById",
  auth,
  biochemicalController.getBiochemicalDiagnosisById
);

module.exports = router;
