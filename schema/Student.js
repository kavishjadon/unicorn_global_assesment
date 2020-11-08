const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  rollno: String,
  batch: String,
  classesAttended: [
    {
      _id: ObjectID,
      present: Boolean,
    },
  ],
});

module.exports = mongoose.model("Student", studentSchema);
