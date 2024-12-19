import React from "react";
import { RotatingLines } from "react-loader-spinner";
const Loader = () => {
  return (
    <div className="loader flex-center">
      <RotatingLines
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="rotating-square-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      <h1 className="heading" style={{ color: "black" }}>
        wait..
      </h1>
    </div>
  );
};

export default Loader;
