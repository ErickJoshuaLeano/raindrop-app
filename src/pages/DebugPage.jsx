import * as React from "react";
import Iframe from "react-iframe";

const DebugPage = () => {
  return (
    <Iframe
      url="https://www.accuweather.com/"
      width="640px"
      height="320px"
      id=""
      className=""
      display="block"
      position="relative"
    />
  );
};

export default DebugPage;
