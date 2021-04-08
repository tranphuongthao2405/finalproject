const mongoose = require("mongoose");

const roleSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department"
    }
  },
  { timestamps: true }
);

const Role = mongoose.model("Role", roleSchema);

module.exports = { Role };
