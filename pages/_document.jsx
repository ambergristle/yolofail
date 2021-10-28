import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { Children } from "react";
import { ServerStyleSheets } from "@material-ui/core/styles";
import { GTag, FBPixel } from "../components/analytics";
import theme from "../styles/theme";

// import google analytics/adsense and facebook pixel scripts
class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <GTag />
          <FBPixel />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// set resolution order to avoid ssg style conflicts
Document.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage; // store reference to original context
  const sheets = new ServerStyleSheets();

  // update context to wrap app in style provider
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  // get updated props object from context
  const initialProps = await NextDocument.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: [
      ...Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};

export default Document;
