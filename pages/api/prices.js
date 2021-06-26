import getValues from "../../utils/query/getValues";

const query = async (req, res) => {
  const { symbol, amount, date } = req.body;

  try {
    const { details, chartData } = await getValues(symbol, amount, date);

    return res.status(200).json({ details, chartData });
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
};

export default query;
