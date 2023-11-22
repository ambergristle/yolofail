import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { Children } from "react";
import { ServerStyleSheets } from "@material-ui/core/styles";
import { GTagNoScript, FBPixelNoScript } from "../components/analytics";
import theme from "../styles/theme";

// handle noscript case for gtag and fb pixel
class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <FBPixelNoScript />
        </Head>
        <body>
          <GTagNoScript />
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
