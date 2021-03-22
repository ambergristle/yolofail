import React from "react";

import { Grid, Typography } from "@material-ui/core";

function Details(props) {
  return (
    <Grid item xs={12} container>
      <Grid item xs={12}>
        <Typography variant="h2">
          ${props.details.currentValue.toFixed(2)}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" display="inline">
          {props.details.change}${props.details.valueChange.toFixed(2)} (
          {props.details.change}
          {props.details.percentChange.toFixed(2)}%)
        </Typography>
        <Typography variant="h6" display="inline" color="textSecondary">
          {" against S&P500"}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Details;
