import React from "react";
import Navbar from "../components/common/Navbar";

export const Master = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default Master;
