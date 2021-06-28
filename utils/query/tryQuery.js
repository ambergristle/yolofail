import axios from "axios";

import { newError } from "../errors";

// // improve error handling
// pass query values to api for retrieval
const tryQuery = async ({ symbol, amount, date }) => {
  try {
    const results = await axios.post("/api/prices", { symbol, amount, date });

    return results.data;
  } catch (error) {
    // check for status; if 4xx, throw symbol error
    const status = error.response?.status;
    if (status < 500) throw newError(404, "symbol not found");

    // throw server error
    throw newError(500, "sorry, we're experiencing technical difficulties");
  }
};

export default tryQuery;
