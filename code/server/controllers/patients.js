const multer = require("multer");
const { Patient } = require("../models/Patient");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.cwd() + "\\uploads\\");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" || ext !== ".png" || ext !== ".jpeg") {
      return cb(res.status(400).end("only images are allowed"), false);
    }
    cb(null, true);
  },
});

const upload = multer({ storage: storage }).single("file");

exports.uploadImage = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      image: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
};

exports.uploadInfo = (req, res) => {
  const patient = new Patient(req.body);

  patient.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
};

exports.getPatientById = (req, res) => {
  let patientId = req.query.id;

  Patient.find({ patientId: { $in: patientId } })
    .populate("writer")
    .exec((err, patient) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }

      return res.status(200).json({ success: true, patient });
    });
};

exports.getPatientByIdp = (req, res) => {
  let patientId = req.body.patientId;

  Patient.find({ patientId: { $in: patientId } })
    .populate("writer")
    .exec((err, patient) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }

      return res.status(200).json({ success: true, patient });
    });
};

exports.getAllPatients = (req, res) => {
  Patient.find({})
    .populate("writer")
    .exec((err, patients) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }

      return res.status(200).json({ success: true, patients });
    });
};

exports.getPatientsByDepartment = (req, res) => {
  let department = req.body.department;
  Patient.find({
    department: department,
  }).exec((err, patients) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({ success: true, patients });
  });
};

exports.updateInformation = async (req, res) => {
  const filterUpdate = {};

  // only update fields with value not null
  if (req.body.writer) {
    filterUpdate.writer = req.body.writer;
  }

  if (req.body.patientId) {
    filterUpdate.patientId = req.body.patientId;
  }

  if (req.body.name) {
    filterUpdate.name = req.body.name;
  }

  if (req.body.birthDate) {
    filterUpdate.birthDate = req.body.birthDate;
  }

  if (req.body.gender) {
    filterUpdate.gender = req.body.gender;
  }

  if (req.body.address) {
    filterUpdate.address = req.body.address;
  }

  if (req.body.patientType) {
    filterUpdate.patientType = req.body.patientType;
  }

  if (req.body.doctor) {
    filterUpdate.doctor = req.body.doctor;
  }
  if (req.body.department) {
    filterUpdate.department = req.body.department;
  }

  try {
    const doc = await Patient.findOneAndUpdate(
      { patientId: req.body.patientId },
      filterUpdate,
      { new: true }
    );
    return res.status(200).json({ success: true, doc });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
};
