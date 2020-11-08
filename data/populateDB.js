const Student = require("../schema/Student");
const Session = require("../schema/Session");
const students = require("./students.json");
const classes = require("./classes.json");

Student.insertMany(students, (err, docs) =>
  console.log("Students data inserted")
);
Session.insertMany(classes, (err, docs) =>
  console.log("Classes data inserted")
);
