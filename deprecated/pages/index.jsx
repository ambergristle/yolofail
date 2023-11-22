import Head from "next/head";
import { Grid } from "@material-ui/core";

import getValues from "../utils/query/getValues";
import { useStore, initializeStore } from "../utils/store";
import AdGrid from "../components/layout/AdGrid";
import ChartDetails from "../components/chart/ChartDetails";
import ValueChart from "../components/chart/ValueChart";
import QueryForm from "../components/forms/QueryForm";

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
      </AdGrid>
    </>
  );
};

export default ChartView;
