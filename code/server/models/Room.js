const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = mongoose.Schema(
  {
    room: {
      type: String,
    },
    doctor: {
      type: Array,
    },
  },
  { timestamp: true }
);

const Room = mongoose.model("Room", roomSchema);

module.exports = { Room };
