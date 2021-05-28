const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const biochemicalSchema = mongoose.Schema(
  {
    patientId: {
      type: String,
    },
    
    initialSample: {
      type: String,
    },
    caseType: {
      type: String,
    },
    biochemicalDiagnosis: {
      type: String,
    },
    testname: {
      type: Array,
      default: [],
    },
    quantity: {
      type: Array,
      default: [],
    },
    price: {
      type: Array,
      default: [],
    },
    amount: {
      type: Array,
      default: [],
    },
    insurance: {
      type: Array,
      default: [],
    },
    payment: {
      type: Array,
      default: [],
    },
    diff: {
      type: Array,
      default: [],
    },
    total: {
      type: Array,
      default: [],
    },
  },
  { timestamp: true }
);

const BiochemicalDiagnosis = mongoose.model("BiochemicalDiagnosis", biochemicalSchema);

module.exports = { BiochemicalDiagnosis };
