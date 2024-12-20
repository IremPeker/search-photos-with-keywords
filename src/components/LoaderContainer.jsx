import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

const LoaderContainer = () => {
  return (
    <div className="loader-container">
      <PulseLoader color="yellow" size={50} />
    </div>
  );
};

export default LoaderContainer;
