import { useEffect } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import Layout from "../components/Layout";
import theme from "../styles/theme";
import "../styles/globals.css";

const App = ({ Component, pageProps }) => {
  // remove server-side jss to preclude styling conflicts
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) jssStyles.parentElement.removeChild(jssStyles);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
