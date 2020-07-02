import React from "react";
import Loader from 'react-loader-spinner';

const LoaderContainer = () => {
    return(
        <Loader
           className="loader"
           type="Circles"
           color="#00BFFF"
           height={40}
           width={40}
           timeout={3000}
        />
       );
};

export default LoaderContainer;