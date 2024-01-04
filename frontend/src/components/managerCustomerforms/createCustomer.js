import React, { useState } from 'react';
import './createcustomer.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CustomerForm() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    phoneNo: '',
    address: '',
    password: '',
  });

  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/createcustomer',formData)
        .then(res => {
            console.log(res);
            navigate('/readcustomers')
        })
        .catch(err => console.log(err))
    // You can handle form submission here, e.g., send the data to an API or store it in state.
     console.log(formData);
  };

  return (
    <div className='CustomerForm'>
      <h2  className=''>Add Customer</h2>
      <form onSubmit={handleSubmit} >
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phoneNo">Phone No:</label>
          <input
            type="tel"
            id="phoneNo"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CustomerForm;
