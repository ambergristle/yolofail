import { formatISO, format, sub, set } from "date-fns";

import getPrices from "./getPrices";
import parseAdjustedPrices from "./parsePrices";
import packageValues from "./packageValues";

const newDate = sub(new Date(), { years: 1 });
const timeToZero = (dateTime) =>
  set(new Date(dateTime), {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

const getValues = async (symbol, amount, date = newDate) => {
  date = timeToZero(date);
  const dateString = format(date, "yyyy-MM-dd");

  try {
    const [rawIndex, rawAsset] = await Promise.all([
      await getPrices("IVV", dateString),
      await getPrices(symbol, dateString),
    ]);

    console.log(symbol, rawAsset);

    const parsedIndex = parseAdjustedPrices(rawIndex, amount);
    const parsedAsset = parseAdjustedPrices(rawAsset, amount);

    const results = packageValues(parsedIndex, parsedAsset);

    return {
      query: { symbol, amount, date: date },
      ...results,
    };
  } catch (error) {
    console.log(error);
  }
};

export default getValues;
