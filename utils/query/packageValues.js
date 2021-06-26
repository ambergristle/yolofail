const packageValues = (index, asset) => ({
  details: {
    currentValue: asset.currentValue,
    valueDelta: asset.currentValue - index.currentValue,
    percentDelta: asset.percentChange - index.percentChange,
  },
  chartData: {
    labels: index.labels,
    indexValues: index.values,
    assetValues: asset.values,
  },
});

export default packageValues;
