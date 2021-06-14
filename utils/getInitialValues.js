import { format, sub } from "date-fns";

import getPrices from "./getPrices";
import parsePrices from "./parsePrices";
import packageValues from "./packageValues";

const getInitialValues = async (symbol, amount) => {
  const date = sub(new Date(), { days: 5 });
  const dateString = format(date, "yyyy-MM-dd");

  const [indexInitial, assetInitial] = await Promise.all([
    await getPrices("IVV", dateString),
    await getPrices(symbol, dateString),
  ]);

  const parsedIndex = parsePrices(indexInitial, amount);
  const parsedAsset = parsePrices(assetInitial, amount);

  const initialValues = packageValues(parsedIndex, parsedAsset);

  return {
    initialQuery: { symbol, amount, date },
    initialValues,
  };
};

export default getInitialValues;
