const { Diagnosis } = require("../models/Diagnosis");

exports.updateImagingDiagnosis = (req, res) => {
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
};

exports.updateDiagnosis = (req, res) => {
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
};

exports.getDiagnosisByIdp = (req, res) => {
  let patientId = req.body.patientId;
  Diagnosis.find({
    patientId: patientId,
  }).exec((err, doc) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({ success: true, doc });
  });
};

exports.getDiagnosisById = (req, res) => {
  let patientId = req.query.patientId;
  Diagnosis.find({
    patientId: patientId,
  }).exec((err, doc) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({ success: true, doc });
  });
};

exports.putDiagnosis = (req, res) => {
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
};

exports.updateBiochemicalDiagnosis = (req, res) => {
  let patientId = req.body.patientId;

  Diagnosis.findOneAndUpdate(
    {
      patientId: patientId,
    },
    { $set: { biochemical: req.body.biochemical } },
    { new: true },
    (err, doc) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }

      return res.status(200).json({ success: true, doc });
    }
  );
};

exports.updateFungusDiagnosis = (req, res) => {
  let patientId = req.body.patientId;

  Diagnosis.findOneAndUpdate(
    {
      patientId: patientId,
    },
    { $set: { fungusAndParasite: req.body.fungusAndParasite } },
    { new: true },
    (err, doc) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }

      return res.status(200).json({ success: true, doc });
    }
  );
};

exports.updateHematologyDiagnosis = (req, res) => {
  let patientId = req.body.patientId;

  Diagnosis.findOneAndUpdate(
    {
      patientId: patientId,
    },
    { $set: { hematologyAndImmunology: req.body.hematologyAndImmunology } },
    { new: true },
    (err, doc) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }

      return res.status(200).json({ success: true, doc });
    }
  );
};

exports.updateResultDiagnosis = (req, res) => {
  let patientId = req.body.patientId;

  Diagnosis.findOneAndUpdate(
    {
      patientId: patientId,
    },
    { $set: { result: req.body.result } },
    { new: true },
    (err, doc) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }

      return res.status(200).json({ success: true, doc });
    }
  );
};

exports.getDiagnosis = (req, res) => {
  let diagnosis = req.body.diagnosis;

  Diagnosis.find({
    doctorDiagnosis: diagnosis,
  }).exec((err, doc) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({ success: true, doc });
  });
};
