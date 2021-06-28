// chart options and data formatting

// hide extraneous components (axes, legend), make responsive
export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltips: { enabled: false },
  },
  scales: {
    x: {
      display: false,
      grid: { display: false },
      ticks: { display: false },
    },
    y: {
      display: false,
      grid: { display: false },
      ticks: { display: false },
    },
  },
  layout: { padding: 0 },
};

// hide fill and points, color-code asset line by change
// populate with lists of labels (date string: yyyy-mm-dd), index and asset values (float)
export const data = ({ labels, indexValues, assetValues, change }) => ({
  labels: labels,
  datasets: [
    {
      label: "index",
      data: indexValues,
      fill: false,
      pointRadius: 0,
      tension: 1,
      borderCapStyle: "round",
    },
    {
      label: "asset",
      data: assetValues,
      borderColor: change >= 0 ? "rgba(0, 200, 5, 1)" : "rgba(255, 80, 0, 1)",
      fill: false,
      pointRadius: 0,
      tension: 1,
      borderCapStyle: "round",
    },
  ],
});
