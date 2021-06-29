const express = require("express");
const router = express.Router();
const diagnosisController = require('../controllers/diagnosis')
const { auth } = require("../middleware/auth");

router.post("/updateImagingDiagnosis", auth, diagnosisController.updateImagingDiagnosis)

router.post("/updateDiagnosis", auth, diagnosisController.updateDiagnosis)

router.post("/getDiagnosisById", auth, diagnosisController.getDiagnosisByIdp)

router.get("/getDiagnosisById", auth, diagnosisController.getDiagnosisById)

router.post("/putDiagnosis", auth, diagnosisController.putDiagnosis)

router.post("/updateBiochemicalDiagnosis", auth, diagnosisController.updateBiochemicalDiagnosis)

router.post("/updateFungusDiagnosis", auth, diagnosisController.updateFungusDiagnosis)

router.post("/updateHematologyDiagnosis", auth, diagnosisController.updateHematologyDiagnosis)

router.post("/updateResultDiagnosis", auth, diagnosisController.updateResultDiagnosis)

router.post("/getDiagnosis", auth, diagnosisController.getDiagnosis)

module.exports = router;
