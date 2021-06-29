const {
  FungusAndParasiteDiagnosis,
} = require("../models/FungusAndParasiteDiagnosis");

exports.saveFungusAndParasiteForm = (req, res) => {
  let patientId = req.body.patientId;
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

  FungusAndParasiteDiagnosis.findOneAndUpdate(
    {
      patientId: req.body.patientId,
    },
    {
      $set: {
        caseType: caseType,
        fungusDiagnosis: diagnosis,
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

      const biochemicalDiagnosis = new FungusAndParasiteDiagnosis({
        patientId: patientId,
        caseType: caseType,
        fungusDiagnosis: diagnosis,
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

exports.getFungusDiagnosisById = (req, res) => {
  let patientId = req.body.patientId;
  FungusAndParasiteDiagnosis.find({
    patientId: patientId,
  }).exec((err, doc) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({ success: true, doc });
  });
};
