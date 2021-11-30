import axios from "axios";

import { newError, ProviderError } from "../errors";

// request price data from provider, recursively call to handle pagination
const getPrices = async (symbol, date, shift = false, prices = []) => {
  try {
    // request data from provider, extract prices, pagination objects
    const {
      data: { pagination, data },
    } = await axios.get("https://api.marketstack.com/v1/eod", {
      params: {
        access_key: process.env.MARKETSTACK_API_KEY,
        symbols: symbol,
        date_from: date,
        limit: 1000,
        sort: "ASC",
        ...(shift && { offset: shift }),
      },
    });

    // extract pagination data, append new price data to gathered?
    const count = pagination.count + pagination.offset;
    prices = [...prices, ...data];

    // if all pages retrieved return prices, else recursively retrieve remaining
    if (pagination.total === count) return prices;
    return await getPrices(symbol, date, count, prices);
  } catch (error) {
    const { url, method, params } = error.config;
    // if symbol not found, return 404

    if (error.response) {
      const queryErrors = [404, 422, 429];
      const { status, statusText } = error.response;

      if (queryErrors.includes(status)) {
        console.log({ method, url, params, status, statusText });
        throw new ProviderError(status);
      }
    }

    // if api key or other issue, return 500
    console.log(error);

    // throw newError(500);
    throw new ProviderError(500);
  }
};

export default getPrices;
