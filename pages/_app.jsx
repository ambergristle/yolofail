import { useRouter } from "next/router";
import { useEffect } from "react";
import ResizeObserver from "resize-observer-polyfill";
import { ThemeProvider } from "@material-ui/core/styles";
import Layout from "../components/layout/Layout";
import theme from "../styles/theme";
import "../styles/global.css";

import * as gtag from "../utils/gtag";

import { Provider, useHydrate } from "../utils/store";

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  // remove server-side jss to preclude styling conflicts
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) jssStyles.parentElement.removeChild(jssStyles);
  }, []);

  // track route changes with ga (pass new url to ga)
  useEffect(() => {
    const handleRouteChange = (url) => gtag.pageView(url);
    router.events.on("routeChangeComplete", handleRouteChange);
    return router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);

  const store = useHydrate(pageProps.initialZustandState);

  return (
    <ThemeProvider theme={theme}>
      <Provider initialStore={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
