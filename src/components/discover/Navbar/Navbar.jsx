import React, { useState } from "react";
import "./Navbar.css";

const Navbar = ({openModal}) => {
  
  return (
    <div
      className="flex flex-col items-center gap-4"
      style={{ width: "200px" }}
    >
      <button className="upload-button" onClick={openModal}>
        Upload Song
      </button>
      <a className="home-button" href='/'>Back to Home</a>
    </div>
  );
};

export default Navbar;
