import React, { useState } from 'react';
import './createcustomer.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CustomerForm() {
  const [formData, setFormData] = useState({
    suppliername: '',
    contactpersonname: '',
    email: '',
    phoneNum: '',
    address: '',
    password: ''
  });

  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/createsupplier',formData)
        .then(res => {
            console.log(res);
            navigate('/readsuppliers')
        })
        .catch(err => console.log(err))
    // You can handle form submission here, e.g., send the data to an API or store it in state.
     console.log(formData);
  };

  return (
    <div className='CustomerForm'>
      <h2  className=''>Add Supplier</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="suppliername">Supplier Name:</label>
          <input
            type="text"
            id="suppliername"
            name="suppliername"
            value={formData.suppliername}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="contactpersonname">Contact Person:</label>
          <input
            type="text"
            id="contactpersonname"
            name="contactpersonname"
            value={formData.contactpersonname}
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
          <label htmlFor="phoneNum">Phone No:</label>
          <input
            type="tel"
            id="phoneNum"
            name="phoneNum"
            value={formData.phoneNum}
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
