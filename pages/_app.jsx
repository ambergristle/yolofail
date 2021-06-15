import { useEffect } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import Layout from "../components/layout/Layout";
import theme from "../styles/theme";
import "../styles/global.css";

import { Provider, useHydrate } from "../utils/store";

const App = ({ Component, pageProps }) => {
  // remove server-side jss to preclude styling conflicts
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) jssStyles.parentElement.removeChild(jssStyles);
  }, []);

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
