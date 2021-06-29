const { BiochemicalDiagnosis } = require("../models/BiochemicalDiagnosis");

exports.saveBiochemicalForm = (req, res) => {
  let patientId = req.body.patientId;
  let initialSample = req.body.initialSample;
  let caseType = req.body.caseType;
  let diagnosis = req.body.diagnosis;
  let testname = req.body.testName;
  let quantity = req.body.quantity;
  let price = req.body.price;
  let amount = req.body.amount;
  let insurance = req.body.insurance;
  let payment = req.body.payment;
  let diff = req.body.diff;
  let total = req.body.total;

  BiochemicalDiagnosis.findOneAndUpdate(
    {
      patientId: req.body.patientId,
    },
    {
      $set: {
        initialSample: initialSample,
        caseType: caseType,
        biochemicalDiagnosis: diagnosis,
        testname: testname,
        quantity: quantity,
        price: price,
        amount: amount,
        insurance: insurance,
        payment: payment,
        diff: diff,
        total: total,
      },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }

      const biochemicalDiagnosis = new BiochemicalDiagnosis({
        patientId: patientId,
        initialSample: initialSample,
        caseType: caseType,
        biochemicalDiagnosis: diagnosis,
        testname: testname,
        quantity: quantity,
        price: price,
        amount: amount,
        insurance: insurance,
        payment: payment,
        diff: diff,
        total: total,
      });

      if (!doc) {
        biochemicalDiagnosis.save((err, document) => {
          if (err) return res.json({ success: false, err });
        });
      }

      return res.status(200).json({ success: true, doc });
    }
  );
};

exports.getBiochemicalDiagnosisById = (req, res) => {
  let patientId = req.body.patientId;
  BiochemicalDiagnosis.find({
    patientId: patientId,
  }).exec((err, doc) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({ success: true, doc });
  });
};
