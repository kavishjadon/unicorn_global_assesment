import React, { Fragment, useState, useEffect, useRef } from "react";
import {
  Grid,
  Paper,
  Typography,
  Avatar,
  Divider,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
} from "@material-ui/core";
import ClassDetails from "./Attendence";
import Header from "./Header";
import Papa from "papaparse";
import Snackbar from "./Snackbar";

const getUrlParameter = (name) => {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  let regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  let results = regex.exec(window.location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
};

export default function UI2({ classesData }) {
  const classID = getUrlParameter("class");
  const [students, setStudents] = useState([]);
  const [selectAll, setSelectAll] = useState(true);
  const [message, setMessage] = useState(false);
  const fileUploader = useRef();
  const classData = classesData.find((el) => el._id == classID);

  const handleSelectAll = () => {
    let newValues = students.slice();
    newValues = newValues.map((el) => {
      el.present = selectAll ? true : false;
      return el;
    });
    setStudents(newValues);
    setSelectAll(!selectAll);
  };

  const handleFileUpload = (e) => {
    let rollnos = [];
    Papa.parse(e.target.files[0], {
      complete: () => {
        let newValues = JSON.parse(JSON.stringify(students));
        newValues.forEach((student, i) => {
          if (rollnos.findIndex((el) => el == student.rollno) > -1)
            newValues[i].present = true;
        });
        setStudents(newValues);
      },
      header: false,
      fastMode: true,
      skipEmptyLines: true,
      transform: (value) => {
        rollnos.push(value);
      },
    });
  };

  const handleFileDownload = (e) => {
    fetch("/dummy.csv")
      .then((response) => response.blob())
      .then((blob) => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "dummy.csv";
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
  };

  const saveAttendence = () => {
    console.log(students, "saving attendence");
    classData.marked = true;
    fetch(`/api/students?batch=${classData.batch}`, {
      method: "PUT",
      body: JSON.stringify({ students, classData }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => setMessage("Attendence Saved Successfully"))
      .catch(console.log);
  };

  const handleCheckboxChange = (e, index) => {
    let newValues = students.slice();
    newValues[index].present = e.target.checked;
    setStudents(newValues);
  };

  useEffect(() => {
    if (classesData) {
      if (classData) {
        fetch(`/api/students?batch=${classData.batch}&classID=${classID}`)
          .then((res) => res.json())
          .then((res) => setStudents(res.data))
          .catch(console.log);
      }
    }
  }, []);

  return (
    <Fragment>
      <Snackbar message={message} setMessage={setMessage} />
      <Header />
      <br />
      <br />
      <Paper elevation={0} style={{ padding: "0px 20px" }}>
        <ClassDetails classData={classData} noButton />
        <br />
        <Divider />
        <Grid container direction="row" alignItems="flex-end">
          <Grid item>
            <Typography variant="h6">
              <strong>BULK UPLOAD</strong>
            </Typography>
            <Typography variant="subtitle2">
              To bulk upload the attendance of this class, please follow the
              below mentioned steps:
              <ol style={{ margin: 0 }}>
                <li>
                  Download the template by clicking on the "Download" button
                </li>
                <li>
                  Fill the roll nos. of the students "PRESENT" in column 1
                </li>
                <li>Save as ".CSV" file</li>
                <li>
                  <strong>Upload the file using the "Upload" button</strong>
                </li>
              </ol>
            </Typography>
          </Grid>
          <Grid item>
            <input
              type="file"
              id="file"
              ref={fileUploader}
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
            <Button
              onClick={handleFileDownload}
              color="primary"
              variant="contained"
            >
              DOWNLOAD
            </Button>
            <span style={{ margin: "0px 20px" }} />
            <Button
              onClick={() => fileUploader.current.click()}
              color="secondary"
              variant="contained"
            >
              UPlOAD
            </Button>
          </Grid>
        </Grid>
        <br />
      </Paper>
      <br />
      <Paper elevation={0} style={{ padding: "10px 20px" }}>
        <Typography variant="h6">
          <strong>MANUAL ATTENDENCE RECORDING </strong>
        </Typography>
        <Divider style={{ margin: "10px 0" }} />
        <Grid container direction="row" justify="space-between">
          <Grid item>
            <Typography variant="subtitle1">
              Select the students that are/were present in the class or select
              all by clicking on the button
            </Typography>
          </Grid>
          <Grid item>
            <Button
              onClick={handleSelectAll}
              color="primary"
              variant="contained"
            >
              SELECT {selectAll ? "ALL" : "NONE"}
            </Button>
          </Grid>
        </Grid>
        <br />
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead style={{ background: "#fed500" }}>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>
                  <Typography>
                    <strong>STUDENT NAME</strong>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    <strong>ROLL NO.</strong>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    <strong>PRESENT</strong>
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student, index) => (
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Avatar
                      style={{
                        height: 50,
                        width: 50,
                        border: "1px solid black",
                        background: "white",
                      }}
                    >
                      {" "}
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <Typography className="uppercase">
                      {student.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className="uppercase">
                      {student.rollno}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={student.present}
                      onChange={(e) => handleCheckboxChange(e, index)}
                      color="primary"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <Button
          style={{ float: "right" }}
          variant="contained"
          color="secondary"
          onClick={saveAttendence}
        >
          SAVE ATTENDENCE
        </Button>
        <br />
        <br />
      </Paper>
      <br />
    </Fragment>
  );
}
