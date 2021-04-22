const express = require("express");
const router = express.Router();
const { Patient } = require("../models/Patient");
const { auth } = require("../middleware/auth");

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
  let patientId = req.body.id;
  Patient.find({ _id: { $in: patientId } })
    .populate("writer")
    .exec((err, patient) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }

      return res.status(200).json({ success: true, patient });
    });
});

module.exports = router;
