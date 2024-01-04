import React, { useEffect, useState } from 'react'
import Navbar from './employeenavbar';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';


function Read() {
    const {id,empid} = useParams();
    
    const [items,setItems] = useState([]) 
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [orderid,setOrderid] = useState('');
    
    useEffect(()=>{
        axios.get('http://localhost:8081/emporderview/'+id)
        .then(res=>{
            setItems(res.data)
            console.log("This is empvie data",res.data)
            setName(res.data[0].name)
            setEmail(res.data[0].Email)
            setOrderid(res.data[0].orderid)
        })
        .catch(err=> console.log("There is error:"+err))
    },[]);

    items.forEach((item) => {
        console.log("stock:",item.stock_quantity - item.quantity,"product id:",item.product_id)
    })

   

    const handleDelivary = (orderid)=>{
        if(confirm("Do you really want to send the order?")){
           
            
            axios.post(`http://localhost:8081/updateorderstatus/${orderid}/${empid}`)
        .then(res=>{
            console.log(res);
            console.log('order status updated')
            window.history.back();
            updateStocks();
        })
        .catch(err=> console.log("There is error:"+err));
        }else{
            alert('Order Not Delivered');
        }
    }

    const updateStocks = () => {
        items.forEach((item) => {

            console.log("this got excecuted");
          const newStock = item.stock_quantity - item.quantity;
          axios
            .post(`http://localhost:8081/updateStockInProducttable/${item.product_id}/${newStock}`)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => console.log("There is an error: " + err));
        });
      };

    



  return (
    <>
      <div>
      <div className="customer-container">
        <div className="crud-form-container">
          <h2 className='orderheading'>Order Details</h2>
          <h2>Customer Name: {name}</h2>
          <h2>Customer Email: {email}</h2>
          <h2>Order ID: {orderid}</h2>
          <table className="table">
            <thead>
                <tr>
                <th>Sl. No.</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, index) => (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.product_name}</td>
                    <td>{item.quantity}</td>
                    <td>&#8377; {item.subtotal}</td>
                </tr>
                ))}
            </tbody>
        </table>
        <div className='order-buttons'>
            <button className='orderbackbutton' onClick={()=>{window.history.back()}}>Back to Orders</button>
            <button className='delivar-items' onClick={()=>{handleDelivary(orderid)}}>Deliver Items</button>
        </div>
       
        
        </div>
      </div>
      </div>
    </>
    
  )
}

export default Read