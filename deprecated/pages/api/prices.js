import getValues from "../../utils/query/getValues";
import sendErrorAlert from "../../utils/sendErrorAlert";

// execute api request to provider
const query = async (req, res) => {
  if (!req.body) return res.status(400).end();
  const { symbol, amount, date } = req.body;

  try {
    // request and extract packaged value data
    const { details, chartData } = await getValues(symbol, amount, date);

    return res.status(200).json({ details, chartData });
  } catch (error) {
    // return provider error status if present, else 500

    return res.status(error.status || 500).end();
  }
};

export default query;
