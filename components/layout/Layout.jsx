import Head from "next/head";
import { Box } from "@material-ui/core";

import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>
      <Header />
      {children}
      <Footer />
    </Box>
  );
};

export default Layout;
