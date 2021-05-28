const express = require("express");
const router = express.Router();
const { ResultDiagnosis } = require("../models/Result");
const { auth } = require("../middleware/auth");

router.post("/saveResultForm", auth, (req, res) => {
  let patientId = req.body.patientId;
  let diagnosis = req.body.diagnosis;
  let testname = req.body.testName;
  let normalRate = req.body.normalRate;
  let unit = req.body.unit;
  let note = req.body.note;
  let machine = req.body.machine;
  let result = req.body.result;

  ResultDiagnosis.findOneAndUpdate(
    {
      patientId: req.body.patientId,
    },
    {
      $set: {
        diagnosis: diagnosis,
        testname: testname,
        result: result,
        normalRate: normalRate,
        unit: unit,
        note: note,
        machine: machine,
      },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }

      const resultDiagnosis = new ResultDiagnosis({
        patientId: patientId,
        diagnosis: diagnosis,
        testname: testname,
        result: result,
        normalRate: normalRate,
        unit: unit,
        note: note,
        machine: machine,
      });

      if (!doc) {
        resultDiagnosis.save((err, document) => {
          if (err) return res.json({ success: false, err });
        });
      }

      return res.status(200).json({ success: true, doc });
    }
  );
});

router.post("/getResultDiagnosisById", auth, (req, res) => {
  let patientId = req.body.patientId;
  ResultDiagnosis.find({
    patientId: patientId,
  }).exec((err, doc) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({ success: true, doc });
  });
});

module.exports = router;
