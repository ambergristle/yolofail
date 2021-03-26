import React, { useEffect } from "react";

import ReactGA from "react-ga";
import ReactAS from "./components/ReactAS";

import { Grid } from "@material-ui/core";

import Header from "./components/Header";
import History from "./components/History";

function App() {
  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_TRACKING);
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

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
