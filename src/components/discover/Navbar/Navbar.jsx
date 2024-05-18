import React, { useEffect, useState } from "react";
import "./Navbar.css";

const Navbar = ({ openModal }) => {
  const [isMobile, setIsMobile] = useState();

  useEffect(() => {
    if (window.innerWidth < 450) {
      setIsMobile(true);
    }
  }, [window.innerWidth]);

  return (
    <div
      className="flex flex-row md:flex-col lg:flex-col items-center ps-8 md:ps-0 lg:ps-0 gap-4"
      style={{ width: `${isMobile ? "100%" : "200px"}` }}
    >
      <button className="upload-button" onClick={openModal}>
        Upload Song
      </button>
      <a className="home-button" href="/">
        Back to Home
      </a>
    </div>
  );
};

export default Navbar;
