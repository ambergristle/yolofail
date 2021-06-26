import axios from "axios";

const tryQuery = async ({ symbol, amount, date }) => {
  try {
    const results = await axios.post("/api/prices", { symbol, amount, date });

    return results.data;
  } catch (error) {
    console.log(error);
  }
};

export default tryQuery;
