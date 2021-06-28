import Head from "next/head";
import { Grid } from "@material-ui/core";

import getValues from "../utils/query/getValues";
import { useStore, initializeStore } from "../utils/store";
import AdGrid from "../components/layout/AdGrid";
import ChartDetails from "../components/chart/ChartDetails";
import ValueChart from "../components/chart/ValueChart";
import QueryForm from "../components/forms/QueryForm";
import FeedbackFormBlock from "../components/forms/feedback/FeedbackFormBlock";

// meta keywords
const keywords = [
  "yolofail",
  "stock",
  "asset",
  "index",
  "gains",
  "yeet",
  "wallstreetbets",
];

// chart selected asset performance against index (ivv), collect user feedback
// set page meta, wrap chart/forms in grid (gutters for desktop ads)
const ChartView = ({ systemError }) => {
  return (
    <>
      <Head>
        <title>yolofail</title>
        <meta name="description" content="yeet on the market or nah?" />
        <meta name="keywords" content={keywords.join(", ")} />
      </Head>
      <AdGrid>
        <ChartDetails />
        <ValueChart />
        <QueryForm />
        <FeedbackFormBlock />
      </AdGrid>
    </>
  );
};

// initialize store server-side, populating with initial query and results
export const getServerSideProps = async ({ req }) => {
  // return empty object if client-side routing (prevents store from being overwritten)
  if (!req || req.url?.startsWith("/_next/data")) {
    return { props: {} };
  }

  // on first load/refresh, initialize store, get initial state
  const zustandStore = initializeStore();
  const initialZustandState = {
    ...zustandStore.getState(),
  };

  try {
    // fetch default query, results values
    const initialResults = await getValues("GOOG", 100);

    // overwrite default store with initial values if query successful
    return {
      props: {
        initialZustandState: JSON.parse(
          JSON.stringify({ ...initialZustandState, ...initialResults })
        ),
        systemError: false,
      },
    };
  } catch ({ response: { message } }) {
    // else return default store and error message
    const systemError = { error: true, message };

    return {
      props: {
        initialZustandState: JSON.parse(
          JSON.stringify({ ...initialZustandState, systemError })
        ),
      },
    };
  }
};

export default ChartView;
