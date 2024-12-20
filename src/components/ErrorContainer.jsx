import React from "react";

const ErrorContainer = () => {
  return (
    <div className="error-container">
      <p className="error-container__fail-message">
        No image has been found with this keyword :( You can try again with
        another keyword, or go back to Random Photos!
      </p>
    </div>
  );
};

export default ErrorContainer;
