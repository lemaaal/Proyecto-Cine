import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#5C8374]">
      <Navbar />
      <div className="flex-grow content">
        {children}
      </div>
    </div>
  );
};

export default Layout;
