const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const diagnosisSchema = mongoose.Schema(
  {
    patientId: {
      type: String,
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
    imaging: {
      type: String,
    },
    doctorDiagnosis: {
      type: String,
    },
  },
  { timestamp: true }
);

const Diagnosis = mongoose.model("Diagnosis", diagnosisSchema);

module.exports = { Diagnosis };
