import React from "react";
import fail from "../images/fail.webp";

const UrlErrorContainer = () => {
  return (
    <div className="error-container">
      <p className="error-container__error-message">
        Something is wrong with the url!
      </p>
      <img
        className="error-container__fail-message"
        src={fail}
        alt="fail"></img>
    </div>
  );
};

export default UrlErrorContainer;
