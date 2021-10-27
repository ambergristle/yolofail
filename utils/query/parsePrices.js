import format from "date-fns/format";

// extract date and price values from api response
// parse datestring to yyyy-mm-dd and adjust to value of shares purchased
// return object with asset labels, values, currentValue, and percentChange
// uses adjusted close (adj_close) values
const parseAdjustedPrices = (prices, amount) => {
  const { adj_close: purchasePrice } = prices[0];

  const sharesPurchased = amount / purchasePrice;

  const labels = prices.map(({ date }) => format(new Date(date), "yyyy-MM-dd"));
  const values = prices.map(({ adj_close }) => adj_close * sharesPurchased);

  const initialValue = values[0];
  const currentValue = values[values.length - 1];
  const percentChange = (currentValue / initialValue) * 100;

  return { labels, values, currentValue, percentChange };
};

export default parseAdjustedPrices;

// // // DEPRECATED
// // if next day has split factor, divide all previous prices
// extract date and price values from api response
// parse datestring to yyyy-mm-dd and adjust to value of shares purchased
// return object with asset labels, values, currentValue, and percentChange
// uses unadjusted close and split factor
const parsePrices = (prices, amount) => {
  const { close: purchasePrice, split_factor: purchaseSplitFactor } = prices[0];

  const sharesPurchased = amount / (purchasePrice * purchaseSplitFactor);

  const labels = prices.map(({ date }) => format(new Date(date), "yyyy-MM-dd"));
  const values = prices.map(
    ({ close, split_factor }) => close * split_factor * sharesPurchased
  );

  const initialValue = values[0];
  const currentValue = values[values.length - 1];
  const percentChange = currentValue / initialValue;

  return { labels, values, currentValue, percentChange };
};
