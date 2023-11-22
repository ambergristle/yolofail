import { useRouter } from "next/router";
import { useEffect } from "react";
import { install as addResizeObserver } from "resize-observer";
import NextApp from "next/app";
import { ThemeProvider } from "@material-ui/core/styles";

import * as gtag from "../utils/gtag";
import * as fpix from "../utils/fpix";
import getValues from "../utils/query/getValues";
import {
  useStore,
  initializeStore,
  Provider,
  useHydrate,
} from "../utils/store";
import Layout from "../components/layout/Layout";
import theme from "../styles/theme";
import "../styles/global.css";

// resize observer ponyfill if not found (legacy mobile browsers)
// used to manage chart resizing
if (typeof window !== "undefined" && !window.ResizeObserver) {
  addResizeObserver();
}

// wrap all pages in theme and store providers, layout; handle jss, analytics
const App = ({ Component, pageProps, initialZustandState, systemError }) => {
  const router = useRouter();

  // block on ssr
  if (typeof window !== "undefined") fpix.pageView();

  // remove server-side jss to preclude styling conflicts
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) jssStyles.parentElement.removeChild(jssStyles);
  }, []);

  // track route changes with ga (pass new url to ga)
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageView(url);
      fpix.pageView();
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);

  // pass existing? or new store to provider (passed from /index getServerSideProps)
  const store = useHydrate(initialZustandState);

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

// initialize store server-side, populating with initial query and results
App.getInitialProps = async (appContext) => {
  // get initial next app props, required to use with _app
  const appProps = await NextApp.getInitialProps(appContext);

  const { req } = appContext.ctx;

  // only return appProps if client-side routing (prevents store from being overwritten)
  if (!req || req.url?.startsWith("/_next/data")) {
    return { ...appProps };
  }

  // on first load/refresh, initialize store, get initial state
  const zustandStore = initializeStore();
  const initialZustandState = {
    ...zustandStore.getState(),
  };

  try {
    // fetch default query, results values
    const initialResults = await getValues("GME", 100);

    // overwrite default store with initial values if query successful
    return {
      initialZustandState: JSON.parse(
        JSON.stringify({ ...initialZustandState, ...initialResults })
      ),
      ...appProps,
    };
  } catch ({ message }) {
    // else return default store and error message
    const systemError = { error: true, message };

    return {
      initialZustandState: JSON.parse(
        JSON.stringify({ ...initialZustandState, systemError })
      ),
      ...appProps,
    };
  }
};

export default App;
