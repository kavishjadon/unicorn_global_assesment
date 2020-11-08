import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableRow,
  withStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import MuiTableCell from "@material-ui/core/TableCell";

const TableCell = withStyles({
  root: {
    borderBottom: "none",
  },
})(MuiTableCell);

export default function Attendence({
  classData,
  setclassData,
  edit = false,
  noButton = false,
}) {
  const [data, setData] = useState(false);

  const rmSec = (str = "") => {
    str = str.split(" ");
    str[0] = str[0].split(":");
    str[0].pop();
    str[0] = str[0].join(":");
    return str.join(" ");
  };

  useEffect(() => {
    if (classData) {
      let d1 = new Date(classData.start_time);
      let d2 = new Date(classData.end_time);

      let date = d1.toDateString().split(" "); //[Sat,Nov,07,2020]
      let time =
        rmSec(d1.toLocaleTimeString()) +
        " TO " +
        rmSec(d2.toLocaleTimeString());
      let newData = {
        ...classData,
        date,
        time,
      };
      setData(newData);
    }
  }, [classData]);

  return data ? (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell component="th" scope="row" align="center">
            <Paper style={{ background: "#fed500" }}>
              <Typography variant="h6">
                <strong>{data.date[2]}</strong>
              </Typography>
              <Typography variant="h6" className="uppercase">
                <strong>{data.date[1]}</strong>
              </Typography>
            </Paper>
          </TableCell>
          <TableCell>
            <Typography variant="subtitle1" className="uppercase">
              DATE:{" "}
              <strong>
                {data.date[2] + "-" + data.date[1] + "-" + data.date[3]}
              </strong>
            </Typography>
            <Typography variant="subtitle1" className="uppercase">
              TIME: <strong>{data.time}</strong>
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="subtitle1" className="uppercase">
              TOPIC: <strong>{data.topic}</strong>
            </Typography>
            <Typography variant="subtitle1" className="uppercase">
              TEACHER: <strong>{data.teacher}</strong>
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="subtitle1" className="uppercase">
              BATCH: <strong>{data.batch}</strong>
            </Typography>
          </TableCell>
          <TableCell align="right">
            {!noButton ? (
              <Link to={`/attendence?class=${data._id}`}>
                <Button
                  color={edit ? "secondary" : "primary"}
                  variant="contained"
                >
                  {edit ? "EDIT" : "MARK"}
                </Button>
              </Link>
            ) : (
              ""
            )}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ) : (
    false
  );
}
