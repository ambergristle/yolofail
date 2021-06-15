import getValues from "../../../utils/getValues";

const query = async (req, res) => {
  const { symbol, amount, date } = req.body;

  try {
    const { results } = await getValues(symbol, amount, date);

    return res.status(200).json(results);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
};

export default query;
