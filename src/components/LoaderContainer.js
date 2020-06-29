import React from "react";
import Loader from 'react-loader-spinner';

const LoaderContainer = () => {
    return(
        <Loader
           className="loader"
           type="Circles"
           color="#00BFFF"
           height={150}
           width={150}
           timeout={3000} //3 secs
   
        />
       );
};

export default LoaderContainer;