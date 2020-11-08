import React, { Fragment, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Avatar,
  Tabs,
  Tab,
  Box,
} from "@material-ui/core";
import Attendence from "./Attendence";
import Header from "./Header";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function UI1({ classesData }) {
  const [currTab, changeCurrTab] = useState(0);

  const handleTabChange = (e, newValue) => {
    changeCurrTab(newValue);
  };

  return (
    <Fragment>
      <Header />
      <br />
      <Paper elevation={0} style={{ padding: "0px 20px" }}>
        <Tabs
          value={currTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab
            label={
              <div>
                <Typography variant="h6" style={{ fontWeight: 900 }}>
                  UNMARKED
                </Typography>
                <Typography variant="h6" style={{ fontWeight: 900 }}>
                  CLASSES
                </Typography>
              </div>
            }
            {...a11yProps(0)}
          />
          <Tab
            label={
              <div>
                <Typography variant="h6" style={{ fontWeight: 900 }}>
                  MARKED
                </Typography>
                <Typography variant="h6" style={{ fontWeight: 900 }}>
                  CLASSES
                </Typography>
              </div>
            }
            {...a11yProps(1)}
          />
        </Tabs>
        <TabPanel value={currTab} index={0}>
          {classesData
            .filter((el) => !el.marked)
            .map((el, i) => (
              <Attendence classData={el} key={i} />
            ))}
        </TabPanel>
        <TabPanel value={currTab} index={1}>
          {classesData
            .filter((el) => el.marked)
            .map((el, i) => (
              <Attendence classData={el} edit key={i} />
            ))}
        </TabPanel>
      </Paper>
    </Fragment>
  );
}
