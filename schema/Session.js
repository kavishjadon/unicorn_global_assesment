const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  start_time: String,
  end_time: String,
  topic: String,
  teacher: String,
  batch: String,
  marked: Boolean,
});

module.exports = mongoose.model("Classes", sessionSchema);
