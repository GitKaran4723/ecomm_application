import React, { useEffect, useState } from 'react';
import '../styles/usernavbar.css';
import logo from  '../images/logo.jpg';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Navbar(props) {

  const { id } = useParams();

    const [values, setValues] = useState({
        id:''
    });

    useEffect(() => {
        axios.get(`http://localhost:8081/readcustomer/${id}`)
            .then((res) => {
                const data = res.data[0];
                setValues({
                    ...values,
                    id:data.customer_id,
                });
            })
            .catch((err) => console.log("Error:", err));
    }, []); 
  return (
    <nav className="navbar navbar_customer">
      <div className="navbar-brand">
        <a className="navbar-logo">
          <img className='logo' src={logo} alt='logo'/>
          <span className='welcome_note'>{props.welcomeMessage}</span>
        </a>
        
      </div>
      <ul className="navbar-nav">
      <li className="nav-item">
        <Link to={`/customerdashboard/${id}`} className="nav-link">Home</Link>
      </li>
      <li className="nav-item">
        <Link to={`/customerprofile/${id}`} className="nav-link">My Profile</Link>
      </li>
      <li className="nav-item">
        <Link to={`/customerorders/${id}`} className="nav-link">My Orders</Link>
      </li>
      <li className="nav-item">
        <Link to={`/customercart/${id}`} className="nav-link">My Cart</Link>
      </li>
      <li className="nav-item">
        <Link to={'/'} className="nav-link">Log Out</Link>
      </li>

      </ul>
    </nav>
  );
}

export default Navbar;
