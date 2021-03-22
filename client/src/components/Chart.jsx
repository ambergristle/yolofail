import React from "react";

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Line } from "react-chartjs-2";

// chart responds to container size when container has relative position
const useStyles = makeStyles((theme) => ({
  chartContainer: {
    height: "50vh",
    minWidth: "100%",
    position: "relative",
  },
}));

function Chart(props) {
  const classes = useStyles();

  // hide extraneous components, make responsive
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false },
    tooltips: { enabled: false },
    scales: {
      xAxes: [
        {
          gridLines: { display: false },
          ticks: { display: false },
        },
      ],
      yAxes: [
        {
          gridLines: { display: false },
          ticks: { display: false },
        },
      ],
    },
    layout: { padding: 0 },
  };

  // hide fill and points, color-code asset line by change
  const chartData = {
    labels: props.labels,
    datasets: [
      {
        label: "index",
        data: props.indexPrices,
        fill: false,
        pointRadius: 0,
      },
      {
        label: "asset",
        data: props.assetPrices,
        borderColor: props.change >= 0 ? "rgba(0, 200, 5, 1)" : "rgba(255, 80, 0, 1)",
        fill: false,
        pointRadius: 0,
      },
    ],
  };

  return (
    <Grid item xs={12} className={classes.chartContainer}>
      <Line id="history-chart" data={chartData} options={chartOptions} />
    </Grid>
  );
}

export default Chart;
