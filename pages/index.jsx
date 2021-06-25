import { useState } from "react";
import Head from "next/head";
import { Grid } from "@material-ui/core";

import getValues from "../utils/getValues";
import { useStore, initializeStore } from "../utils/store";

import AdGrid from "../components/layout/AdGrid";
import ChartDetails from "../components/chart/ChartDetails";
import ValueChart from "../components/chart/ValueChart";
import QueryForm from "../components/forms/QueryForm";

const ChartView = () => {
  return (
    <>
      <Head>
        <title>yolofail</title>
        <meta name="description" content="yeet on the market or nah?" />
      </Head>
      <AdGrid>
        <ChartDetails />
        <ValueChart />
        <QueryForm />
      </AdGrid>
    </>
  );
};

export const getServerSideProps = async ({ req }) => {
  // return empty object if client-side routing (prevents store from being overwritten)
  if (!req || req.url?.startsWith("/_next/data")) {
    return { props: {} };
  }

  // on initial load/refresh, initialize store
  const zustandStore = initializeStore();

  // fetch default values
  const initialResults = await getValues("GOOG", 100);

  // populate store with initial query and results
  const initialZustandState = {
    ...zustandStore.getState(),
    ...initialResults,
  };

  return {
    props: {
      initialZustandState: JSON.parse(JSON.stringify(initialZustandState)),
    },
  };
};

export default ChartView;
