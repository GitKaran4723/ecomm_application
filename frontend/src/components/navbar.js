import React from 'react';
import './Navbar.css';
import logo from  '../images/logo.jpg';


function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/" className="navbar-logo">
          <img className='logo' src={logo} alt='logo'/>
        </a>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <a href="/" className="nav-link">Home</a>
        </li>
        <li className="nav-item">
          <a href="/login" className="nav-link">Login</a>
        </li>
        <li className="nav-item">
          <a href="/signup" className="nav-link">Sign Up</a>
        </li>
        <li className="nav-item">
          <a href="/reports" className="nav-link">Stock</a>
        </li>
        <li className="nav-item">
          <a href="/contact" className="nav-link">Contact us</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
