const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imagingDiagnosisSchema = mongoose.Schema(
  {
    patientId: {
      type: String,
    },
    images: {
      type: Array,
      default: [],
    },
    imagingDiagnosis: {
        type: Array,
        default: [],
    },
  },
  { timestamp: true }
);

const ImagingDiagnosis = mongoose.model("ImagingDiagnosis", imagingDiagnosisSchema);

module.exports = { ImagingDiagnosis };
