const express = require("express");
const router = express.Router();
const { Diagnosis } = require("../models/Diagnosis");
const { auth } = require("../middleware/auth");

router.post("/updateImage", auth, (req, res) => {
  let patientId = req.body.patient;

  Diagnosis.findOneAndUpdate(
    {
      patient: patientId,
    },
    { $set: { images: req.body.images } },
    { new: true },
    (err, doc) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      
      const diagnosis = new Diagnosis(req.body);

      if (!doc) {
        diagnosis.save((err, doc) => {
          if (err) return res.json({ success: false, err });
        });
      }

      return res.status(200).json({ success: true, doc });
    }
  );
});

module.exports = router;
