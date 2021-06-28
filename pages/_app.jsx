import { useRouter } from "next/router";
import { useEffect } from "react";
import { install as addResizeObserver } from "resize-observer";
import { ThemeProvider } from "@material-ui/core/styles";

import * as gtag from "../utils/gtag";
import { Provider, useHydrate } from "../utils/store";
import Layout from "../components/layout/Layout";
import theme from "../styles/theme";
import "../styles/global.css";

// resize observer ponyfill if not found (legacy mobile browsers)
// used to manage chart resizing
if (typeof window !== "undefined" && !window.ResizeObserver) {
  addResizeObserver();
}

// wrap all pages in theme and store providers, layout; handle jss, analytics
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

  // pass existing? or new store to provider (passed from /index getServerSideProps)
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
