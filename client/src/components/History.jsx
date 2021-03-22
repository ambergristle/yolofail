import React, { useState, useEffect } from "react";

import sub from "date-fns/sub"; // subtract from date (time picker bounds, date shift)
import isValid from "date-fns/isValid"; // check if date valid (form error handling)
import format from "date-fns/format"; // format date strings (api call)

import Details from "./Details"; // current value and $ + % growth
import Loading from "./Loading"; // occupies chart space before load
import Chart from "./Chart"; // line chart with index + asset prices; sign-colored
import Form from "./Form"; // symbol, dollar amount, date; passed to api
import Feedback from "./Feedback"; // user feedback form (in dev)

import getHistory from "./getHistory"; // fetch data

function History() {
  // initial state value; used as static form helper text
  const defaults = {
    symbol: "GOOG",
    amount: (100.0).toFixed(2),
    date: sub(new Date(), { years: 1 }),
  };

  const [payload, setPayload] = useState({
    symbol: defaults.symbol,
    amount: defaults.amount,
    date: defaults.date,
  })

  // data loaded for chart (show chart?)
  const [loaded, setLoaded] = useState(false);

  // values passed to Details component; set when data is updated
  const [details, setDetails] = useState({
    currentValue: 100,
    change: "+",
    valueChange: 0,
    percentChange: 0,
  });

  // values passed to Chart component; set when data is updated
  const [history, setHistory] = useState({
    labels: [],
    indexPrices: [],
    assetPrices: [],
    change: 0,
  });

  // runs on initial render, fetching historical data
  // second arg (empty array) defines 'watched' values, executes callback on change

  useEffect(() => {
    // wrap fetch call and state updates to enable await
    async function asyncWrapper() {
      // get default chart data
      const response = await getHistory(
        payload.symbol,
        format(payload.date, "yyyy-MM-dd"),
        payload.amount * 100)

      // if call is successful, update details and history states
      if (response) {
        if (response.status === 200) {
          const results = response.data;
          const snapData = results.details;
          const chartData = results.chartData;

          setDetails({
            currentValue: snapData.currentValue,
            change: snapData.valueDelta >= 0 ? "+" : "-",
            valueChange: Math.abs(snapData.valueDelta),
            percentChange: Math.abs(snapData.percentDelta),
          });

          setHistory({
            labels: chartData.labels,
            indexPrices: chartData.indexPrices,
            assetPrices: chartData.assetPrices,
            change: snapData.valueDelta,
          });

          setLoaded(true);
        } else if (response.status === 404) {
          console.log('symbol error');
          setError({ symbol: "Symbol Unavailable" });
        } else {
          console.log('system error');
        }

      // else update error states
      } else {
        console.log('system error'); ////// check
      }
    }

    asyncWrapper();
  }, [payload]);

  // form error text
  const [errors, setError] = useState({
    symbol: "",
    amount: "",
  });

  // form values; passed to api
  // regex error handling for symbol + amount (date handled internally)
  const [selectedSymbol, setSymbol] = useState(defaults.symbol);
  const handleSymbolChange = (event) => {
    let val = event.target.value;
    setSymbol(val);
    let reg = new RegExp(/^[A-Za-z]*$/).test(val);
    if (!reg) {
      setError({ symbol: "Invalid Symbol Format" });
    } else {
      setError({ symbol: "" });
    }
  };

  const [selectedAmount, setAmount] = useState(defaults.amount);
  const handleAmountChange = (event) => {
    let val = event.target.value;
    setAmount(val);
    let reg = new RegExp(/^(\d|\.)*$/).test(val);
    if (!reg) {
      setError({ amount: "Invalid Amount Format" });
    } else {
      setError({ amount: "" });
    }
  };

  const [selectedDate, setDate] = useState(defaults.date);

  // call api and reload chart when form is submitted
  const handleClick = () => {
    if (
      Boolean(errors.symbol) ||
      Boolean(errors.amount) ||
      !isValid(selectedDate)
    ) {
      // trigger form error ?
      console.log("error");
    } else {
      setPayload({
        symbol: selectedSymbol,
        amount: selectedAmount,
        date: selectedDate,
      });
    }
  };

  return (
    <>
      <Details details={details} />
      {loaded ? <Chart labels={history.labels} indexPrices={history.indexPrices} assetPrices={history.assetPrices} change={history.change} /> : <Loading />}
      <Form
        defaults={defaults}
        selectedSymbol={selectedSymbol}
        handleSymbolChange={handleSymbolChange}
        selectedAmount={selectedAmount}
        handleAmountChange={handleAmountChange}
        selectedDate={selectedDate}
        handleDateChange={(date) => { setDate(date); }}
        handleClick={handleClick}
        errors={errors}
      />
      <Feedback />
    </>
  );
}

export default History;
