  import React, { useEffect } from "react";

  function ReactAS() {

    useEffect(() => {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }, []);

    return (
      <>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-5710547669928682"
          data-ad-slot="5710547669928682"
          data-ad-format="auto"
        />
      </>
    );
  }

  export default ReactAS;
