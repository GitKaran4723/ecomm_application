import React, { useEffect, useState } from 'react';
import Navbar from './customernavbar';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/userdashboard.css';

function CustomerDashboard() {
  const { id } = useParams();
  const [customer, setCustomer] = useState([]);
  const [data, setData] = useState([]);
  const [orderid, setOrderid] = useState('');
 
 
  const [formData, setFormData] = useState({
    orderid: '',
    productid: '',
    quantity: '',
    subtotal: '',
    customer_id:''
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8081/readcustomer/${id}`)
      .then((res) => {
        setCustomer(res.data[0]);
      })
      .catch((err) => console.log("There is an error: " + err));
  }, [id]);

  useEffect(() => {
    axios
      .get('http://localhost:8081/products')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  if (orderid === '') {
    const maxval = 10000000;
    setOrderid(Math.floor(Math.random() * maxval));
  }

  const welcomeMessage = `Welcomes you, ${customer.name}!`;

  useEffect(()=>{
    console.log(formData);
    if(formData.orderid!='' && formData.quantity!=''){
      axios
      .post('http://localhost:8081/addorderitems', formData)
      .then((res) => {
        console.log(res);
        alert("Item Added to cart")
        
      })
      .catch((e) => console.log(e));
    }
  },[formData]);

  const handlequantity = async ()=>{ formData.quantity =  prompt('Enter the quantity:')}

  const handleCart = async (productId, productSubtotal,customer_id) => {
    handlequantity();

      console.log("customer:",customer_id)
      console.log("quantity:",formData.quantity)

      const totalAmount = formData.quantity * productSubtotal;
      console.log("total amount:",totalAmount)

      setFormData({
        orderid: orderid,
        productid: productId,
        quantity: formData.quantity,
        subtotal: totalAmount,
        customer_id: customer_id
      });
  };

  return (
    <>
      <Navbar welcomeMessage={welcomeMessage}/>
      <div className='items-container'>
        <h1 className='items_available'>Available Items</h1>
        {data.map((product, index) => (
          <div key={index} className='each-item'>
            <div className='image-items'>
              <img src={product.imgurl} className='image-item' alt='this is an image' />
            </div>
            <div className='item-data'>
              <h2>{product.product_name}</h2>
              <p>Color: {product.color}</p>
              <p>Category: {product.category}</p>
              <p>Cost: &#x20B9;{product.price}</p>
              <p>Product Size: {product.size}</p>
              <p>Available Stock: {product.Stock_quantity}</p>
            </div>
            <div className='purachase-buttons'>
              <button
                className='cart-btn'
                onClick={() => {handleCart(product.product_id, product.price,customer.customer_id )}}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CustomerDashboard;
