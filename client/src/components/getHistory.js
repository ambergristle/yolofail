// request data pull from api
async function getHistory(symbol, date, amount) {
  const url = `${process.env.REACT_APP_DOMAIN}/prices/${symbol}/${date}/${amount}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      // check for endpoint errors
      if (response.status === 404 || response.status === 422) {
        return { status: 404 };
      } else {
        return { status: 500 };
      }
    } else {
      const data = await response.json();
      return { status: 200, data: data };
    }
  } catch (error) {
    return { status: 500 };
  }
}

export default getHistory;
