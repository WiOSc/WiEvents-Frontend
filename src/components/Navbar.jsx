import React from 'react';
import './Navbar.css'; // Import CSS file

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logoContainer">
        <img
          src="/images/WiOS_White_NoBG.png" 
          alt="Club Logo"
          className="logo"
        />
      </div>
      <div className="eventName">
        <h1>WiEvents</h1>
      </div>
    </div>
  );
};

export default Navbar;
