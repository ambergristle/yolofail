const API_KEY = process.env.MARKETSTACK_API_KEY;

const buildQuery = (symbol, date, shift) => {
  const base = `https://api.marketstack.com/v1/eod?access_key=${API_KEY}`;
  const query = `&symbols=${symbol}`;
  const start = `&date_from=${date}`;
  const offset = shift ? `&offset=${shift}` : "";
  const limit = "&limit=1000";
  const sort = `&sort=ASC`;

  return `${base}${query}${start}${offset}${limit}${sort}`;
};

export default buildQuery;
