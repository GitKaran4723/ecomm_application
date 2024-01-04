import React, { useState } from 'react';
import './createcustomer.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CustomerForm() {
  const [formData, setFormData] = useState({
    product_name: '',
    description: '',
    price: '',
    size: '',
    color: '',
    category: '',
    Stock_quantity: '',
    imgurl:'',
    bought_quantity:''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.product_name === ''){
      alert("Please Enter Appropriate Details")
    }
    else{
      axios.post('http://localhost:8081/createproduct',formData)
        .then(res => {
            console.log(res);
            navigate('/readproducts')
        })
        .catch(err =>{
          console.log(err)
          alert('Data Not added:')
        })
    // You can handle form submission here, e.g., send the data to an API or store it in state.
     console.log(formData);

    }
    
  };

  return (
    <div className='CustomerForm'>
      <h2  className=''>Add a Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="product_name">Product Name:</label>
          <input
            type="text"
            id="product_name"
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="size">Size:</label>
          <input
            type="number"
            id="size"
            name="size"
            value={formData.size}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="color">Color:</label>
          <input
            type='text'
            id="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type='text'
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="Stock_quantity">Stock Quantity:</label>
          <input
            type='number'
            id="Stock_quantity"
            name="Stock_quantity"
            value={formData.Stock_quantity}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="imgurl">Imge URL:</label>
          <input
            type='text'
            id="imgurl"
            name="imgurl"
            value={formData.imgurl}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="bought_quantity">Stock Quantity:</label>
          <input
            type='number'
            id="bought_quantity"
            name="bought_quantity"
            value={formData.bought_quantity}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CustomerForm;
