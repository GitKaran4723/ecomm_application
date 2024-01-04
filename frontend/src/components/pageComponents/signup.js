import React, { useState } from 'react';
import './signup.css';
import Navbar from '../navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Signup() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('customer');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNo: '',
    age: '',
    address: '',
    password: '',
    phoneNum: '', // For supplier only
    suppliername: '', // For supplier only
    contactpersonname: '' // For supplier only
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if(userType === 'customer'){
      axios.post('http://localhost:8081/createcustomer',formData)
        .then(res => {
          navigate('/login')
          alert('Customer Created Succesfully: login with email and password');
        })
        .catch(err => console.log(err))  
    }
    if(userType === 'supplier'){
      axios.post('http://localhost:8081/createsupplier',formData)
        .then(res => {
            navigate('/login')
            alert('Supplier Created Succesfully: login with email and password');
        })
        .catch(err => console.log(err))
    // You can handle form submission here, e.g., send the data to an API or store it in state.
     console.log(formData);
    }
    // Perform signup logic here based on userType and formData
    console.log('Signup data:', userType, formData);
  };

  return (
    <>
      <Navbar />
      <div className="signup-container">
        <h2 className='signup-text'> Sign Up as </h2>
        <div className="user-type">
          <button
            className={`type-button ${userType === 'customer' ? 'active' : ''}`}
            onClick={() => setUserType('customer')}
          >
            Customer
          </button>
          <button
            className={`type-button ${userType === 'supplier' ? 'active' : ''}`}
            onClick={() => setUserType('supplier')}
          >
            Supplier
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-fields">
       
            <input
              type="text"
              name={userType === 'customer'?'name':'suppliername'}
              placeholder={userType === 'customer'?'Customer Name':'Supplier Name'}
              value={userType === 'customer'?formData.name:formData.suppliername}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder={userType === 'customer'?'Customer Email':'Supplier Email'}
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="number"
              name={userType==='customer'?'phoneNo':'phoneNum'}
              placeholder="Phone Number"
              value={userType==='customer'?formData.phoneNo:formData.phoneNum}
              onChange={handleChange}
            /><br />
            {userType === 'customer' && (
              <>
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleChange}
                />
                
              </>
            )}
            {userType === 'supplier' && (
              <>
                <input
                  type="text"
                  name="contactpersonname"
                  placeholder="Contact Person"
                  value={formData.contactpersonname}
                  onChange={handleChange}
                />
               </> 
            )}
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Signup</button>
        </form>
      </div>
    </>
  );
}
