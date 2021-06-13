const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const departmentSchema = mongoose.Schema(
  {
    department: {
      type: String,
    },
    doctor: {
      type: Array,
    },
  },
  { timestamp: true }
);

const Department = mongoose.model("Department", departmentSchema);

module.exports = { Department };
