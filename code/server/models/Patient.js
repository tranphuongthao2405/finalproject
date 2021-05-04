const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    patientId: {
      type: String,
    },
    name: {
      type: String,
    },
    birthDate: {
      type: String,
    },
    gender: {
      type: String,
    },
    address: {
      type: String,
    },
    patientType: {
      type: String,
    },
    doctor: {
      type: String
    },
    department: {
      type: String,
    },
  },
  { timestamp: true }
);

const Patient = mongoose.model("Patient", patientSchema);

module.exports = { Patient };
