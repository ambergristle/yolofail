import { format, formatISO, sub, set } from "date-fns";

import getPrices from "./getPrices";
import parseAdjustedPrices from "./parsePrices";
import packageValues from "./packageValues";
import { newError, ApiError } from "../errors";
import sendErrorAlert from "../sendErrorAlert";

// set default date to today - 1 year
const newDate = sub(new Date(), { years: 1 });

// zero-out time to prevent client/server mismatch
const timeToZero = (dateTime) =>
  set(new Date(dateTime), {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

// // improve error handling
// retrieve and package values using passed query params
const getValues = async (symbol, amount, date = newDate) => {
  // set, zero, and format date for query
  date = timeToZero(date);
  const dateString = format(date, "yyyy-MM-dd");

  try {
    // get index and asset prices
    const [rawIndex, rawAsset] = await Promise.all([
      await getPrices("IVV", dateString),
      await getPrices(symbol, dateString),
    ]);

    // extract labels, adjusted close values (price * shares)
    const parsedIndex = parseAdjustedPrices(rawIndex, amount);
    const parsedAsset = parseAdjustedPrices(rawAsset, amount);

    if (parsedIndex.labels.length !== parsedAsset.labels.length) {
      // throw new error, sending alert to email, asset-specific msg to client
      sendErrorAlert(`Asset Data Incomplete: ${symbol}`);
      throw new ApiError(418);
    }

    // package parsed data for chart and details
    const results = packageValues(parsedIndex, parsedAsset);

    return {
      query: { symbol, amount, date: date },
      ...results,
    };
  } catch (error) {
    const status = error.status;

    // if getPrices error && not rate limit, escalate status
    // // else if 429, send alert &&
    // // escalate 500
    if (status) {
      if (status !== 429) {
        throw new ApiError(status);
      } else {
        // is this the right status code?
        sendErrorAlert("Rate Limit Exceeded");
      }
    }

    throw new ApiError(500);
  }
};

export default getValues;
