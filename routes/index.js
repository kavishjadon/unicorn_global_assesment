const express = require("express");
const router = express.Router();
const Student = require("../schema/Student");
const Session = require("../schema/Session");

router.get("/students", (req, res) => {
  Student.find({ batch: req.query.batch }, (err, data) => {
    data = data.map((el) => {
      let doc = el.classesAttended.find((ol) => ol._id == req.query.classID);
      let obj = {};
      obj.classID = req.query.classID;
      obj.present = doc ? doc.present : false;
      return {
        _id: el._id,
        name: el.name,
        rollno: el.rollno,
        batch: el.batch,
        ...obj,
      };
    });
    res.json({ data, error: false });
  });
});

router.get("/classes", (req, res) => {
  Session.find({}, (err, data) => {
    res.json({ data, error: false });
  });
});

router.put("/students", (req, res) => {
  let students = req.body.students;

  students.forEach((student) => {
    Student.findOne({ _id: student._id }, (err, doc) => {
      let i = doc.classesAttended.findIndex((el) => el._id == student.classID);
      let data = {
        _id: student.classID,
        present: student.present,
      };
      if (i > -1) doc.classesAttended[i].present = student.present;
      else doc.classesAttended.push(data);
      doc.save();
    });
  });

  Session.findOne({ _id: students[0].classID }, (err, doc) => {
    doc.marked = true;
    doc.save();
  });
  res.json({ updated: "OK" });
});

module.exports = router;
