const express = require("express");
const router = express.Router();
const { Diagnosis } = require("../models/Diagnosis");
const { auth } = require("../middleware/auth");

router.post("/updateImagingDiagnosis", auth, (req, res) => {
  let patientId = req.body.patientId;

  Diagnosis.findOneAndUpdate(
    {
      patientId: patientId,
    },
    { $set: { imaging: req.body.imaging } },
    { new: true },
    (err, doc) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }

      return res.status(200).json({ success: true, doc });
    }
  );
});

router.post("/updateDiagnosis", auth, (req, res) => {
  let patientId = req.body.patientId;
  let result;
  if (
    req.body.value2 !== "" ||
    req.body.value3 !== "" ||
    req.body.value4 !== ""
  ) {
    result = "pending";
  } else if (
    req.body.value2 !== "" &&
    req.body.value3 !== "" &&
    req.body.value4 !== ""
  ) {
    result = "";
  }

  Diagnosis.findOneAndUpdate(
    {
      patientId: patientId,
    },
    {
      $set: {
        doctorDiagnosis: req.body.primaryDiagnosis,
        biochemical: req.body.value2,
        fungusAndParasite: req.body.value3,
        hematologyAndImmunology: req.body.value4,
        imaging: req.body.value1,
      },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }

      const diagnosis = new Diagnosis({
        patientId: req.body.patientId,
        biochemical: req.body.value2,
        fungusAndParasite: req.body.value3,
        hematologyAndImmunology: req.body.value4,
        result: result,
        imaging: req.body.value1,
        doctorDiagnosis: req.body.primaryDiagnosis,
      });

      if (!doc) {
        diagnosis.save((err, doc) => {
          if (err) return res.json({ success: false, err });
        });
      }

      return res.status(200).json({ success: true, doc });
    }
  );
});

router.post("/getDiagnosisById", auth, (req, res) => {
  let patientId = req.body.patientId;
  Diagnosis.find({
    patientId: patientId,
  }).exec((err, doc) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({ success: true, doc });
  });
});

router.post("/putDiagnosis", auth, (req, res) => {
  const diagnosis = new Diagnosis({
    patientId: req.body.patientId,
    biochemical: "",
    fungusAndParasite: "",
    hematologyAndImmunology: "",
    result: "",
    imaging: "",
    doctorDiagnosis: "",
  });

  diagnosis.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true, doc });
  });
});

// should reference to patient schema
// router.get("/getImagingPatientList", auth, (req, res) => {
//   Diagnosis.find({
//     imaging: "pending",
//   }).exec((err, docs) => {
//     if (err) {
//       return res.status(400).json({ success: false, err });
//     }

//     return res.status(200).json({ success: true, docs });
//   });
// });

module.exports = router;
