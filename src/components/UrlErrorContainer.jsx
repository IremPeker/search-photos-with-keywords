import React from "react";
import fail from "../images/fail.webp";

const UrlErrorContainer = () => {
  return (
    <div className="url-error-container">
      <p className="url-error-container__error-message">
        Something is wrong with the url!
      </p>
      <img
        className="url-error-container__fail-message"
        src={fail}
        alt="fail"></img>
    </div>
  );
};

export default UrlErrorContainer;
