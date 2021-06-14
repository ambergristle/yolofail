import Head from "next/head";
import { Grid } from "@material-ui/core";

import getInitialValues from "../utils/getInitialValues";

import QueryForm from "../components/forms/QueryForm";

const ChartView = ({ initialValues }) => {
  return (
    <>
      <Head>
        <title>yolofail</title>
        <meta name="description" content="yeet on the market or nah?" />
      </Head>
      <QueryForm />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const initialValues = await getInitialValues("GOOG", 100);

  return { initialValues };
};

export default ChartView;
