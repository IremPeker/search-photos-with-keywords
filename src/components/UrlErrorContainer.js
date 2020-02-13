import React from "react";
import fail from "../images/fail.webp";

const UrlErrorContainer = () => {
  return (
    <div>
      <p className="errorMsg">Something is wrong with the url!</p>
      <img className="fail" src={fail} alt="fail"></img>
    </div>
  );
};

export default UrlErrorContainer;
