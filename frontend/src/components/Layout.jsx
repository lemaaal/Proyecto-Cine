import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children, showNavbar = true }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#5C8374]">
      {showNavbar && <Navbar />}
      <div className="flex-grow content">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
