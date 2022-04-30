import React from "react";
import { Grid, Paper } from "@mui/material";
import AssessmentIcon from "@mui/icons-material/Assessment";
const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <Grid container>
        <Grid item md={4}>
          <Paper></Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
