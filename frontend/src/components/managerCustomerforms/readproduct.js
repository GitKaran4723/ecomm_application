import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './reademployee.css';

function Read() {
    const {id} = useParams();
    const [product,setProduct] = useState([]) 
    
    useEffect(()=>{
        axios.get('http://localhost:8081/readproduct/'+id)
        .then(res=>{
            console.log(res.data)
            setProduct(res.data[0])
        })
        .catch(err=> console.log("There is error:"+err))
    },[id])
  
    
  return (
    <div className='body-container'>
        <div className='data-container'>
            <h2 className='heading-details'>Product Details </h2>
            <h2>Product ID: {product.product_id }</h2>
            <h2>Product Name: {product.product_name}</h2>
            <h2>Description: {product.description}</h2>
            <h2>Price: &#x20B9;{product.price}</h2>
            <h2>Size: {product.size}</h2>
            <h2>Color: {product.color}</h2>
            <h2>Category: {product.category}</h2>
            <h2>Stock Quantity: {product.Stock_quantity}</h2>
           <Link to='/readproducts' style={{color:'black'}}>Back</Link>
        </div>
    </div>
  )
}

export default Read