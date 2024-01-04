import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './customerorders.css';
import { Link, useParams } from 'react-router-dom';

import Navbar from './customernavbar'; // Use PascalCase for component file names

export default function Home() {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [orderitems, setOrderItems] = useState([]);
  const [orderid, setOrderid] = useState('');
  const [productNames, setProductNames] = useState([]); // Use an array to store product names
  const [loading, setLoading] = useState(true); // Track loading state
  const [totalamount, setAmount] = useState(''); // Track loading state


 

  useEffect(() => {
    axios.get('http://localhost:8081/myorders/' + id)
      .then(res => {
        setOrders(res.data);
        console.log("these are orders",res.data);
      })
      .catch(err => console.log("There is an error:" + err));
  }, [id]);

  useEffect(() => {
    axios.get(`http://localhost:8081/readcustomer/${id}`)
      .then(res => {
        console.log("customerdata", res.data[0])
        setCustomer(res.data[0]);
      })
      .catch(err => console.log("There is an error: " + err));
  }, [id]);

  const handleOrderBtn = async (orderid) => {
    console.log(orderid);
    setOrderid(orderid);

    alert('You Will Download a payment Slip Now');

    axios.post(`http://localhost:8081/updatePaymentStatus/${orderid}`)
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log("There is an error: " + err));


    for(var i=0;i<orders.length;i++){
      if(orders[i].orderid ===  orderid){
        setAmount(orders[i].total_amount)
      }
    }

    try {
      // Fetch order items
      const orderItemsResponse = await axios.get(`http://localhost:8081/customerordereditems/${orderid}`);
      setOrderItems(orderItemsResponse.data);
      console.log("Order items", orderItemsResponse.data);

      // Fetch product names for all order items concurrently
      const productIDPromises = orderItemsResponse.data.map(orderItem => fetchProductName(orderItem.productid));
      const productNames = await Promise.all(productIDPromises);
      setProductNames(productNames);
      
      // Mark loading as complete
      setLoading(false);

      // Trigger the print dialog
      window.print();
    } catch (error) {
      console.error("There is an error: " + error);
    }
  };

  async function fetchProductName(productID) {
    try {
      const productResponse = await axios.get(`http://localhost:8081/readproduct/${productID}`);
      const productData = productResponse.data;

      // Assuming productData is an object that contains product information including product_name
      const productName = productData[0].product_name;

      return productName;
    } catch (error) {
      console.error("Failed to fetch product name:", error);
      // Handle the error, e.g., return a default value or throw an error
      throw error;
    }
  }
  //setAmount(orders[0].amount);
  // 

  return (
    <>
      <div className='navber-myorders'>
        <Navbar />
      </div>
      <div className="order-container">
        <div className="crud-order-container">
          <h2>My Orders</h2>

          <table className="table table-data">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Total Amount</th>
                <th>Order Status</th>
                <th>Update Order Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className='table-data'>
                  <td>{order.orderid}</td>
                  <td>{order.order_date.slice(0, 10)}</td>
                  <td>&#x20B9; {order.total_amount}</td>
                  <td>{order.order_status}</td>
                  <td className={order.order_status === 'Order Recieved' ? 'delivered_Green' : ''}>
                {order.order_status === 'Delivered' ? (
                  <button className='btn-recieveorder' onClick={() => handleOrderBtn(order.orderid)}>Order Received</button>
                ) : (
                  order.order_status === 'Order Recieved' ? 'Order Closed' : 'Order Placed'
                )}
      </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {loading ? (
        <div className='load-productnames'>
            <h1>Please reload the page your Invoice is being Prepared.....</h1>
        </div>
      ) : (
        <div className='reciept-form'>
          <h1 className='reciept-heading'>INVOICE</h1>
          <h1 className='reciept-company'>Fashion Collections</h1>
          <h1 className='customerName reciept-data'>Customer Name: {customer.name}</h1>
          <h1 className='orderid reciept-data'>Order ID: {orderid}</h1>
          <table className="table table-data">
            <thead>
              <tr>
                <th>Sl No.</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Cost Per item</th>
              </tr>
            </thead>
            <tbody>
              {orderitems.map((order, index) => (
                <tr key={index} className='table-data'>
                  <td>{index + 1}</td>
                  <td>{productNames[index]}</td> {/* Display product_name for each item */}
                  <td>{order.quantity}</td>
                  <td>&#x20B9; {order.subtotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='bottom-recipt'>
                <h1 className='reciept-amount'>Total Amount:{totalamount}</h1>
          </div>
        </div>
      )}
    </>
  );
}
