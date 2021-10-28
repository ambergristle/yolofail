import { Fragment } from "react";
import { GA_TRACKING_ID } from "../../utils/gtag";

// google tag manager and ads scripts
const GTag = () => (
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
