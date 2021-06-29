const { ImagingDiagnosis } = require("../models/ImagingDiagnosis");
const fs = require("fs");
const csvWriter = require("csv-write-stream");
const parse = require("csv-parse");
const spawn = require("child_process").spawn;
const ps = require("python-shell");

exports.saveImage = (req, res) => {
  let images = req.body.images;
  let imagingProcessing = [];
  let finalPathFile = process.cwd() + "/imageProcessing/testdata.csv";

  // test code to generate data into csv file
  let imgNames = [];
  images.forEach((image) => {
    let imageName = image.substring(8);
    imageName = imageName.substring(0, imageName.length - 4);
    imgNames.push(imageName);
  });

  if (!fs.existsSync(finalPathFile)) {
    writer = csvWriter({ headers: ["image_name", "target"] });
  } else {
    writer = csvWriter({ sendHeaders: false });
  }

  let fsStream = fs.createWriteStream(finalPathFile, { flags: "a" });
  writer.pipe(fsStream);
  imgNames.forEach((imgName) => {
    writer.write({
      header1: imgName,
      header2: Math.random().toFixed(7),
    });
  });

  writer.end(function () {
    fsStream.on("finish", function () {
      fsStream.end();
    });
  });

  return res.status(200).json({ success: true });
};

exports.uploadImage = (req, res) => {
  let patientId = req.body.pId;
  let images = req.body.images;
  let imagingProcessing = [];
  let finalPathFile = process.cwd() + "/imageProcessing/testdata.csv";
  let pythonFilePath = process.cwd() + "\\uploads\\maskgen.py";

  const parser = parse({ columns: true }, function (err, records) {
    records.forEach((record) => {
      images.forEach((image) => {
        let imageNamewExt = image.substring(8);
        let imageName = image.substring(8);
        imageName = imageName.substring(0, imageName.length - 4);

        const ls = spawn("python", [pythonFilePath, imageNamewExt], {
          cwd: process.cwd() + "\\uploads\\",
        });

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

  fs.createReadStream(finalPathFile).pipe(parser);
};

exports.getImagingDiagnosisById = (req, res) => {
  let patientId = req.body.patientId;
  ImagingDiagnosis.find({
    patientId: patientId,
  }).exec((err, doc) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({ success: true, doc });
  });
};
