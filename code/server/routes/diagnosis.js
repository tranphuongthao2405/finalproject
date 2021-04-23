const express = require("express");
const router = express.Router();
const { Diagnosis } = require("../models/Diagnosis");
const { auth } = require("../middleware/auth");

router.post("/updateImage", auth, (req, res) => {
  let patientId = req.body.patientId;

  Diagnosis.find(
    {
      patient: { $in: patientId },
    },
    (err, diagnosis) => {
      if (err) {
        const diagnosis = new Diagnosis({
          patient: patientId,
          biochemical: "",
          fungusAndParasite: "",
          hematologyAndImmunology: "",
          result: "",
          images: req.body.images,
          doctorDiagnosis: "",
        });

        console.log(diagnosis);
        diagnosis.save((err, doc) => {
          if (err) return res.json({ success: false, err });
          return res.status(200).json({
            success: true,
            doc,
          });
        });
      }

      // update
      Diagnosis.findOneAndUpdate(
        {
          patient: { $in: patientId },
        },
        { $set: { images: req.body.images } },
        { new: true },
        (err, doc) => {
          if (err) return res.status(500).json({ success: false, err });
          return res.status(200).json({
            success: true,
            doc,
          });
        }
      );
    }
  );
});

module.exports = router;
