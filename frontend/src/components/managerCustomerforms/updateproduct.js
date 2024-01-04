import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './updateStyles.css';

function Update() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [values, setValues] = useState({
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

    useEffect(() => {
        axios.get(`http://localhost:8081/readproduct/${id}`)
          .then((res) => {
            console.log(res.data);
            console.log(id);
            const data = res.data[0];
            setValues({
              ...values,
              product_name: data.product_name,
              description: data.description, 
              price: data.price, 
              size: data.size, 
              color: data.color, 
              category: data.category, 
              Stock_quantity: data.Stock_quantity,
              imgurl:data.imgurl,
              bought_quantity:data.bought_quantity
            });
          })
          .catch((err) => console.log("Error:", err));
      }, [id]); // Include 'id' as a dependency to trigger the effect when 'id' changes

    const handleUpdate = (event) => {
        event.preventDefault();
        console.log(values);
        axios.put(`http://localhost:8081/updateproduct/${id}`, values)
            .then((res) => {
                console.log(res);
                navigate('/readproducts');
            })
            .catch((err) => console.log("Error found", err));
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    }

    return (
        <div className='edit-container'>
            <div className='edit-form-container'>
                <form onSubmit={handleUpdate}>
                    <h2>Update Product Details</h2>
                    <div className='mb-2'>
                        <label htmlFor='product_name'>Product Name</label>
                        <input
                            type='text'
                            id='product_name'
                            name='product_name'
                            placeholder='Enter Product  Name'
                            className='form-control'
                            onChange={handleInputChange}
                            value={values.product_name}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='description'>Description</label>
                        <textarea
                            type='email'
                            id='description'
                            name='description'
                            placeholder='Enter description'
                            className='form-control'
                            onChange={handleInputChange}
                            value={values.description}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='price'>Price</label>
                        <input
                            type='number'
                            id='price'
                            name='price'
                            placeholder='Enter price'
                            className='form-control'
                            onChange={handleInputChange}
                            value={values.price}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='size'>Size</label>
                        <input
                            type='text'
                            id='size'
                            name='size'
                            placeholder='Enter size'
                            className='form-control'
                            onChange={handleInputChange}
                            value={values.size}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='color'>Color</label>
                        <input
                            type='text'
                            id='color'
                            name='color'
                            placeholder='Enter color'
                            className='form-control'
                            onChange={handleInputChange}
                            value={values.color}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='category'>Category</label>
                        <input
                            type='text'
                            id='category'
                            name='category'
                            placeholder='Enter Hidate'
                            className='form-control'
                            onChange={handleInputChange}
                            value={values.category}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='Stock_quantity'>Stock Quantity</label>
                        <input
                            type='number'
                            id='Stock_quantity'
                            name='Stock_quantity'
                            placeholder='Enter Stock Quantity'
                            className='form-control'
                            onChange={handleInputChange}
                            value={values.Stock_quantity}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='imgurl'>Image Url</label>
                        <input
                            type='imgurl'
                            id='imgurl'
                            name='imgurl'
                            placeholder='Enter URL'
                            className='form-control'
                            onChange={handleInputChange}
                            value={values.imgurl}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='bought_quantity'>Bought Quantity</label>
                        <input
                            type='number'
                            id='bought_quantity'
                            name='bought_quantity'
                            placeholder='Enter Quantity'
                            className='form-control'
                            onChange={handleInputChange}
                            value={values.bought_quantity}
                        />
                    </div>
                    <button className='btn btn-success'>Update</button>
                </form>
            </div>
        </div>
    );
}

export default Update;
