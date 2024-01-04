import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/productcard.css';
import Navbar from './customernavbar';

function MyDatabaseProject() {
  const { id } = useParams();
  const [orderitems, setOrderItems] = useState([]);
  const [customer, setCustomer] = useState({});
  const [data, setData] = useState([]);
  const [groupedOrderItems, setGroupedOrderItems] = useState([]);

  useEffect(() => {
    // Fetch customer data
    axios
      .get(`http://localhost:8081/readcustomer/${id}`)
      .then((res) => {
        setCustomer(res.data[0]);
      })
      .catch((err) => console.error("Error fetching customer data: " + err));
  }, [id]);

  useEffect(() => {
    // Fetch order items data
    axios
      .get(`http://localhost:8081/customerorderitems/${id}`)
      .then((res) => {
        console.log(res.data);
        setOrderItems(res.data);
      })
      .catch((err) => console.error("Error fetching order items: " + err));
  }, [id]);

  useEffect(() => {
    // Fetch product data
    axios
      .get('http://localhost:8081/products')
      .then((res) => {
        console.log(res.data)
        setData(res.data);
      })
      .catch((err) => console.error("Error fetching product data: " + err));
  }, []);

  useEffect(() => {
    // Group the order items and calculate the subtotal sum for each group
    const groupedItems = groupOrderItems(orderitems);
    setGroupedOrderItems(groupedItems);
  }, [orderitems]);

  function getProductName(productid) {
    const product = data.find((item) => item.product_id === productid);
    return product ? product.product_name : 'Product Not Found';
  }

  function groupOrderItems(orderitems) {
    const groupedItems = [];
    let currentOrder = null;

    orderitems.forEach((item) => {
      if (item.orderid !== currentOrder) {
        // Start a new group
        currentOrder = item.orderid;
        groupedItems.push([item]);
      } else {
        // Add to the current group
        groupedItems[groupedItems.length - 1].push(item);
      }
    });

    // Calculate the subtotal sum for each group
    groupedItems.forEach((group) => {
      group.totalSubtotal = group.reduce((total, product) => total + product.subtotal * product.quantity, 0);
    });

    return groupedItems;
  }

  async function handleDeleteItem(itemid, orderid) {
    try {
      await axios.delete(`http://localhost:8081/delete/ordetitems?itemid=${itemid}&orderid=${orderid}`);
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete item:", error);
      // Handle the error, e.g., show an error message to the user
    }
  }

  async function handlePlaceOrder(orderid, customer_id) {
    if (confirm("Are you sure you want to place the order?")) {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().slice(0, 10);
      
      // Calculate the total amount for the current order group
      const totalamount = groupedOrderItems
        .find(group => group[0].orderid === orderid)
        .totalSubtotal.toFixed(2);

      try {
        // Update order status
        await axios.post(`http://localhost:8081/setorderstatus/${orderid}`);
        
        // Set order data
        const newOrderData = {
          orderid: orderid,
          customer_id: customer_id,
          order_date: formattedDate,
          total_amount: totalamount,
        };
        // Send the order data to the server
        await axios.post('http://localhost:8081/placeorder', newOrderData);
        
        // Reload the page
        window.location.reload();
        alert("Hurreeee! Order Placed");
      } catch (error) {
        console.error("Error placing order:", error);
        // Handle the error, e.g., show an error message to the user
      }
    }
  }
  
  const welcomeMessage = `Welcome, ${customer.name}!`;

  return (
    <>
      <Navbar welcomeMessage={welcomeMessage} />
      <div className='mycard-background'>
        <h1 className='cartheading'>My Cart</h1>
        {groupedOrderItems.map((group, groupIndex) => (
          <div key={groupIndex} className="order-group">
            {group.map((product, productIndex) => (
              <div className="product-card" key={productIndex}>
                <h2>{getProductName(product.productid)}</h2>
                <h3>Price: &#x20B9;{product.subtotal}</h3>
                <h3>Quantity: {product.quantity}</h3>
                <button className="btn remove-button" onClick={() => handleDeleteItem(product.itemid, product.orderid)}>Remove</button>
              </div>
            ))}
            <div className="group-total">
              <h2>Total: &#x20B9; {group.totalSubtotal.toFixed(2)}</h2>
              <button className="btn order-button" onClick={() => handlePlaceOrder(group[0].orderid, customer.customer_id)}>Order</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default MyDatabaseProject;
