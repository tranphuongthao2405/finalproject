const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patients");
const { auth } = require("../middleware/auth");

router.post("/uploadImage", auth, patientController.uploadImage);

router.post("/uploadInfo", auth, patientController.uploadInfo);

router.get("/getPatientById", auth, patientController.getPatientById);

router.post("/getPatientById", auth, patientController.getPatientByIdp);

router.get("/getAllPatients", auth, patientController.getAllPatients);

router.post(
  "/getPatientsByDepartment",
  auth,
  patientController.getPatientsByDepartment
);

router.post("/updateInformation", auth, patientController.updateInformation);

module.exports = router;
