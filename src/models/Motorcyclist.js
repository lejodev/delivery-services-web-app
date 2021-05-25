const mongoose = require("mongoose");

const motorcyclist = mongoose.Schema({
  taken: Boolean,
  takenBy: String,
  takenIn: Number,
});

module.exports = mongoose.model("Motorcyclist", motorcyclist);
