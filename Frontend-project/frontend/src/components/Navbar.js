import React from 'react';
import { Link } from 'react-router-dom';
import '../css/nav.css';

const Navbar = () => {
  return (
    <div className="vertical-navbar">
      <h2>Hospitality</h2>
      <ul>
        <li><Link to="/doctor-login">Doctor Login</Link></li>
        <li><Link to="/doctor-registration">Doctor Registration</Link></li>
        <li><Link to="/patient-login">Patient Login</Link></li>
        <li><Link to="/patient-register">Patient Registration</Link></li>
      </ul>
    </div>
  );
};

export default Navbar;
