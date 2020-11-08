import React, { useState, useEffect, Fragment } from "react";
import {
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import useStyles from "./styles";
import UI1 from "./components/UI1";
import UI2 from "./components/UI2";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Catamaran",
  },
  palette: {
    primary: {
      main: "#fed500",
    },
  },
});

export default function ClippedDrawer() {
  const classes = useStyles();
  const [classesData, setClassesData] = useState();

  useEffect(() => {
    fetch("/api/classes")
      .then((res) => res.json())
      .then((res) => setClassesData(res.data));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar elevation={0} position="fixed" className={classes.appBar}>
          <Toolbar></Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <List>
              {["ATTENDENCE", "MARK ATTENDENCE", "VIEW ATTENDENCE"].map(
                (text, index) => (
                  <ListItem button key={text}>
                    <ListItemText primary={text} />
                  </ListItem>
                )
              )}
            </List>
          </div>
        </Drawer>
        <main className={classes.content}>
          <Toolbar />
          <Router>
            <Switch>
              {classesData ? (
                <Fragment>
                  <Route exact path="/">
                    <UI1 classesData={classesData} />
                  </Route>
                  <Route exact path="/attendence">
                    <UI2 classesData={classesData} />
                  </Route>
                </Fragment>
              ) : (
                ""
              )}
            </Switch>
          </Router>
        </main>
      </div>
    </ThemeProvider>
  );
}
