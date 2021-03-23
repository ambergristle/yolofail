const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const dateDelta = require("date-fns/differenceInCalendarMonths");
const format = require("date-fns/format");

const app = express();
const options = { origin: process.env.ORIGIN };

const API_KEY = process.env.API_KEY;

// generate endpoint url and fetch data from provider
async function _retrieve(symbol, date, shift = false, data = false) {
  const base = `https://api.marketstack.com/v1/eod?access_key=${API_KEY}`;
  const query = `&symbols=${symbol}`;
  const start = `&date_from=${date}`;
  const offset = shift ? `&offset=${shift}` : "";
  const limit = "&limit=1000";
  const sort = `&sort=ASC`;

  const url = `${base}${query}${start}${offset}${limit}${sort}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return response.status;
    }

    const res = await response.json();

    // extract pagination info and data
    const meta = res["pagination"];
    const items = [...(data || []), ...res["data"]];
    const count = meta["count"] + meta["offset"];

    // if pages > 1, recursively fetch and package
    if (meta["total"] === count) {
      return items;
    } else {
      return await _retrieve(symbol, date, count, items);
    }
  } catch (error) {
    return error;
  }
}

// split dates and prices into lists
function _extract(data) {
  const labels = [];
  const prices = [];

  for (let day of data) {
    labels.push(day["date"].slice(0, 10));
    prices.push(day["adj_close"]);
  }

  return { labels: labels, prices: prices };
}

// calculate change and package data
function _package(labels, indexPrices, assetPrices, amount) {
  function _calcChange(prices, amount) {
    const percentChange = prices[prices.length - 1] / prices[0];
    const currentValue = percentChange * amount;

    return {
      percentChange: percentChange,
      currentValue: currentValue,
    };
  }

  function _rebase(prices, amount) {
    const shares = amount / prices[0];
    return prices.map((day) => day * shares);
  }

  const indexChange = _calcChange(indexPrices, amount);
  const assetChange = _calcChange(assetPrices, amount);

  return {
    details: {
      currentValue: assetChange.currentValue,
      valueDelta: assetChange.currentValue - indexChange.currentValue,
      percentDelta: assetChange.percentChange - indexChange.percentChange,
    },

    chartData: {
      labels: labels,
      indexPrices: _rebase(indexPrices, amount),
      assetPrices: _rebase(assetPrices, amount),
    },
  };
}

// handle endpoint requests
const endpoint = "/prices/:symbol/:date/:amount";
app.get(endpoint, cors(options), async function (req, res) {
  const symbol = req.params.symbol;
  const date = req.params.date;
  const amount = parseInt(req.params.amount) / 100;

  try {
    const indexResponse = await _retrieve("IVV", date);
    const assetResponse = await _retrieve(symbol, date);

    // confirm that both calls were successful
    const validIndex = Array.isArray(indexResponse);
    const validAsset = Array.isArray(assetResponse);

    if (validIndex && validAsset) {
      const indexData = _extract(indexResponse);
      const assetData = _extract(assetResponse);

      return res
        .status(200)
        .send(
          _package(
            indexData["labels"],
            indexData["prices"],
            assetData["prices"],
            amount
          )
        );
    } else {
      return res.sendStatus(!validIndex ? indexResponse : assetResponse);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

const port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log(`yeeting price data on port ${port}`);
});
