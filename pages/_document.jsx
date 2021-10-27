import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { Children } from "react";
import { ServerStyleSheets } from "@material-ui/core/styles";

import theme from "../styles/theme";

import { GA_TRACKING_ID } from "../utils/gtag";
import { FB_PIXEL_ID } from "../utils/fpix";

// import google analytics/adsense and facebook pixel scripts, using public tracking id
class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* google analytics scripts */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
          <script
            data-ad-client="ca-pub-5710547669928682"
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          />
          {/* facebook pixel scripts */}
          <script src="./public/facebookScript" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s){
                  if(f.fbq)return;
                  n=f.fbq=function(){
                    n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)
                  };
                  if(!f._fbq)f._fbq=n;
                  n.push=n;
                  n.loaded=!0;
                  n.version='2.0';
                  n.queue=[];
                  t=b.createElement(e);
                  t.async=!0;
                  t.src=v;
                  s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)
                }(
                  window,
                  document,
                  'script',
                  'https://connect.facebook.net/en_US/fbevents.js'
                );
                fbq('init', '${FB_PIXEL_ID}');
                fbq('track', 'PageView');
              `,
            }}
          />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
            />
          </noscript>
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
