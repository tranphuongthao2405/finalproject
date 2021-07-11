const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patients");
const { auth } = require("../middleware/auth");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" || ext !== ".png" || ext !== ".jpeg") {
      return cb(res.status(400).end("only images are allowed"), false);
    }
    cb(null, true);
  },
});

const upload = multer({ storage: storage }).single("file");

router.post("/uploadImage", auth, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      image: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

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
