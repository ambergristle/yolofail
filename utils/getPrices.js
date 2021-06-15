import axios from "axios";
import buildQuery from "./buildQuery";

const getPrices = async (symbol, date, shift = false, prices = []) => {
  const query = buildQuery(symbol, date, shift);

  console.log(query);

  try {
    // request data specified in query
    const {
      data: { pagination, data },
    } = await axios.get(query);

    // extract pagination info and data
    const count = pagination.count + pagination.offset;
    prices = [...prices, ...data];

    // if all pages retrieved return prices, else recursively retrieve remaining
    if (pagination.total === count) return prices;
    return await getPrices(symbol, date, count, prices);
  } catch (error) {
    console.log(error);
  }
};

export default getPrices;
