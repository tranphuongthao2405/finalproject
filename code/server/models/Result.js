const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resultSchema = mongoose.Schema(
  {
    patientId: {
      type: String,
    },
    diagnosis: {
      type: String,
    },
    testname: {
      type: Array,
      default: [],
    },
    result: {
      type: Array,
      default: [],
    },
    normalRate: {
      type: Array,
      default: [],
    },
    unit: {
      type: Array,
      default: [],
    },
    note: {
      type: Array,
      default: [],
    },
    machine: {
      type: Array,
      default: [],
    },
  },
  { timestamp: true }
);

const ResultDiagnosis = mongoose.model("ResultDiagnosis", resultSchema);

module.exports = { ResultDiagnosis };
