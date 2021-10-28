import { Fragment } from "react";
import { GA_TRACKING_ID } from "../../utils/gtag";

// google tag manager and ads scripts
export const GTagScript = () => (
  <Fragment>
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
  </Fragment>
);

export const GTagNoScript = () => (
  <Fragment>
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GA_TRACKING_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  </Fragment>
);
