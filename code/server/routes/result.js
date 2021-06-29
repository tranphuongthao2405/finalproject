const express = require("express");
const router = express.Router();
const resultController = require("../controllers/result");
const { auth } = require("../middleware/auth");

router.post("/saveResultForm", auth, resultController.saveResultForm);

router.post(
  "/getResultDiagnosisById",
  auth,
  resultController.getResultDiagnosisById
);

module.exports = router;
