// hide extraneous components, make responsive
export const options = {
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
export const data = (labels, indexPrices, assetPrices, change) => ({
  labels: labels,
  datasets: [
    {
      label: "index",
      data: indexPrices,
      fill: false,
      pointRadius: 0,
    },
    {
      label: "asset",
      data: assetPrices,
      borderColor: change >= 0 ? "rgba(0, 200, 5, 1)" : "rgba(255, 80, 0, 1)",
      fill: false,
      pointRadius: 0,
    },
  ],
});
