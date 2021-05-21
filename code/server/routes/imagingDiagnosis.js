const express = require("express");
const router = express.Router();
const { ImagingDiagnosis } = require("../models/ImagingDiagnosis");
const { auth } = require("../middleware/auth");
const fs = require("fs");
const parse = require("csv-parse");

router.post("/uploadImage", auth, (req, res) => {
  let patientId = req.body.pId;
  let images = req.body.images;
  let imagingProcessing = [];
  const parser = parse({ columns: true }, function (err, records) {
    records.forEach((record) => {
      images.forEach((image) => {
        let imageName = image.substring(8);
        imageName = imageName.substring(0, imageName.length - 4);
        if (imageName === record.image_name) {
          imagingProcessing.push(record.target);
        }
      });
    });

    ImagingDiagnosis.findOneAndUpdate(
      {
        patientId: patientId,
      },
      { $set: { images: images, imagingDiagnosis: imagingProcessing } },
      { new: true },
      (err, doc) => {
        if (err) {
          return res.status(400).json({ success: false, err });
        }

        const imagingDiagnosis = new ImagingDiagnosis({
          patientId: patientId,
          images: images,
          imagingDiagnosis: imagingProcessing,
        });

        if (!doc) {
          imagingDiagnosis.save((err, doc) => {
            if (err) return res.json({ success: false, err });
          });
        }

        return res.status(200).json({ success: true, doc });
      }
    );
  });

  fs.createReadStream(process.cwd() + "/imageProcessing/testdata.csv").pipe(
    parser
  );
});

router.post("/getImagingDiagnosisById", auth, (req, res) => {
  let patientId = req.body.patientId;
  ImagingDiagnosis.find({
    patientId: patientId,
  }).exec((err, doc) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({ success: true, doc });
  });
});

module.exports = router;
