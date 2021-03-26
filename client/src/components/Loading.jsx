import React from "react";

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ReactLoading from "react-loading";

const useStyles = makeStyles((theme) => ({
  loadingContainer: {
    height: "50vh",
    minWidth: "100%",
  },
}));

function Loading() {
  const classes = useStyles();

  return (
    <Grid
      item
      xs={12}
      container
      justify="center"
      className={classes.chartContainer}
    >
      <ReactLoading
        type="spin"
        color="rgba(0,0,0,.25)"
        height={"20%"}
        width={"20%"}
      />
    </Grid>
  );
}

export default Loading;
