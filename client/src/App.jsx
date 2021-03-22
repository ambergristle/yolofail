import React from "react";

import { Grid } from "@material-ui/core";

import Header from "./components/Header";
import History from "./components/History";

function App() {
  return (
    <>
      <Header />
      <Grid container>
        <Grid item xs={false} sm={2}></Grid>
        <Grid item xs={12} sm={8} spacing={2} container>
          <History />
        </Grid>
        <Grid item xs={false} sm={2}></Grid>
      </Grid>
    </>
  );
}

export default App;
