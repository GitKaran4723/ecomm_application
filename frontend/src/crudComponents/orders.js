import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './customers.css';
import Navbar from './crudnavigaationManager'; // Use PascalCase for component file names


export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8081/readallorders')
      .then((res)=>{
            console.log(res.data)
            setData(res.data)
        }
      )
      .catch((err) => console.error(err)); // Use console.error to log errors
  }, []);

  return (
    <>
      <Navbar />
      <div className="customer-container">
        <div className="crud-form-container">
          <h2>Order Details</h2>
          <table className="table">
            <thead>
                <tr>
                <th>Customer ID</th>
                <th>Customer Name</th>
                <th>Order ID</th>
                <th>Ordered Date</th>
                <th>Handled Employee</th>
                <th>Order Status</th>
                <th>Payment Status</th>
                <th>Total Amount</th>
                </tr>
            </thead>
            <tbody>
                {data.map((customer, index) => (
                <tr key={index}>
                    <td>{customer.customer_id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.orderid}</td>
                    <td>{customer.order_date.slice(0,10)}</td>
                    <td>{customer.employeeid}</td>
                    <td>{customer.order_status}</td>
                    <td>{customer.payment_status}</td>
                    <td>{customer.total_amount}</td>
                </tr>
                ))}
            </tbody>
        </table>

        </div>
      </div>
    </>
  );
}
