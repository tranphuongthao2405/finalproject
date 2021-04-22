const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const diagnosisSchema = mongoose.Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
    },
    biochemical: {
      type: String,
    },
    fungusAndParasite: {
      type: String,
    },
    hematologyAndImmunology: {
      type: String,
    },
    result: {
      type: String,
    },
    images: {
      Type: Array,
      default: [],
    },
    doctorDiagnosis: {
      type: String,
    },
  },
  { timestamp: true }
);

const Diagnosis = mongoose.model("Diagnosis", diagnosisSchema);

module.exports = { Diagnosis };
