const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fungusAndParasiteSchema = mongoose.Schema(
  {
    patientId: {
      type: String,
    },
    caseType: {
      type: String,
    },
    fungusDiagnosis: {
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

const FungusAndParasiteDiagnosis = mongoose.model("FungusAndParasiteDiagnosis", fungusAndParasiteSchema);

module.exports = { FungusAndParasiteDiagnosis };
