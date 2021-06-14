import Head from "next/head";

import { Grid } from "@material-ui/core";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>
      <Grid container>{children}</Grid>
    </>
  );
};

export default Layout;
