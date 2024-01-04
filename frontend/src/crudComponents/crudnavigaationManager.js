import React from 'react';
import './Crudnavbar.css';
import logo from  '../images/logo.jpg';


function Navbar() {
  return (
    <nav className="crud-navbar">
      <div className="navbar-brand">
        <a href="/" className="navbar-logo">
          <img className='logo' src={logo} alt='logo'/>
        </a>
      </div>
      <ul className="navbar-nav">
        
        <li className="nav-item">
          <a href="/readcustomers" className="nav-link">Customers</a>
        </li>
        <li className="nav-item">
          <a href="/reademployees" className="nav-link">Employees</a>
        </li>
        <li className="nav-item">
          <a href="/readproducts" className="nav-link">Products</a>
        </li>
        <li className="nav-item">
          <a href="/readsuppliers" className="nav-link">Suppliers</a>
        </li>
        <div class="dropdown">
        <button class="dropbtn">Other Details</button>
        <div class="dropdown-content ">
            <a href="/readorders">Orders</a>
            <a href="/readpayments">Payments</a>
        </div>
    </div>
        <li className="nav-item">
          <a href="/" className="nav-link logout">Log Out</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
