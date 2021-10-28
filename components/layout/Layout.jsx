import Head from "next/head";
import { Box } from "@material-ui/core";
import { GTagScript, FBPixelScript } from "../analytics";
import Header from "./Header";
import Footer from "./Footer";

// set global header values, wrap all pages in header/footer
// import google analytics/adsense and facebook pixel scripts
const Layout = ({ children }) => {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <GTagScript />
        <FBPixelScript />
      </Head>
      <Header />
      {children}
      <Footer />
    </Box>
  );
};

export default Layout;
