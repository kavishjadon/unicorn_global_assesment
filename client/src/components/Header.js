import React from "react";
import { Paper, Grid, Avatar, Typography } from "@material-ui/core";

export default function Header() {
  return (
    <Paper elevation={0} style={{ padding: "15px 20px" }}>
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="space-between"
      >
        <Grid item>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
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
            </Grid>
            <Grid item>
              <Typography
                variant="h3"
                style={{ fontWeight: "900", color: "#fed500" }}
              >
                IMS PITAMPURA
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2">TOTAL STUDENTS : 21</Typography>
          <Typography variant="subtitle2">TOTAL BATCHES : 4</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
