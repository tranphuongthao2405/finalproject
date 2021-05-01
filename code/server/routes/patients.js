const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Patient } = require("../models/Patient");
const { auth } = require("../middleware/auth");

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

router.post("/uploadInfo", auth, (req, res) => {
  const patient = new Patient(req.body);

  patient.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

router.get("/getPatientById", auth, (req, res) => {
  let patientId = req.query.id;

  Patient.find({ patientId: { $in: patientId } })
    .populate("writer")
    .exec((err, patient) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }

      return res.status(200).json({ success: true, patient });
    });
});

router.post("/getPatientById", auth, (req, res) => {
  let patientId = req.body.patientId;

  Patient.find({ patientId: { $in: patientId } })
    .populate("writer")
    .exec((err, patient) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }

      return res.status(200).json({ success: true, patient });
    });
});

module.exports = router;