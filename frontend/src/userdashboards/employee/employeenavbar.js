import React, { useEffect, useState } from 'react';
import '../styles/usernavbar.css';
import logo from  '../images/logo.jpg';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Navbar(props) {

  const {id} = useParams();
    const [employee,setEmployee] = useState([]) 
    
    useEffect(()=>{
        axios.get('http://localhost:8081/reademployee/'+id)
        .then(res=>{
            console.log(res.data)
            setEmployee(res.data[0])
        })
        .catch(err=> console.log("There is error:"+err))
    },[id])


  return (
    <nav className="navbar navbar_employee">
      <div className="navbar-brand">
        <a className="navbar-logo">
          <img className='logo' src={logo} alt='logo'/>
          <span className='welcome_note'>{props.welcomeMessage}</span>
        </a>
        
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <a href={"/employeeprofile/"+employee.empid} className="nav-link">My Profile</a>
        </li>
        <li className="nav-item">
          <a href={"/employeeorders/"+employee.empid} className="nav-link">Orders</a>
        </li>
        <li className="nav-item">
          <a href="/" className="nav-link">Log Out</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
