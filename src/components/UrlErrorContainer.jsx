import React from "react";
import fail from "../images/fail.webp";

const UrlErrorContainer = () => {
  return (
    <div>
      <p className="error-message">Something is wrong with the url!</p>
      <img className="fail-message" src={fail} alt="fail"></img>
    </div>
  );
};

export default UrlErrorContainer;
