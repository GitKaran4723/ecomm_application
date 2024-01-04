import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './customers.css';
import { Link } from 'react-router-dom';
import Navbar from './crudnavigaationManager'; // Use PascalCase for component file names
import EditIcon from '../images/edit_icon.png';
import DeleteIcon from '../images/delete_icon.png';
import CreateIcon from '../images/createicon.png';


export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8081/customers')
      .then((res)=>{
          console.log(res);
          setData(res.data)
        }
      )
      .catch((err) => console.error(err)); // Use console.error to log errors
  }, []);


  const handleDelete = (customer_id,name) => {
    console.log(customer_id)
    alert('Are you sure You wants to delete '+ name);
    axios
      .delete(`http://localhost:8081/delete/customer/${customer_id}`)
      .then((res) => {
        console.log("Deletion response:", res);
        window.location.reload();
      })
      .catch((err) => {
        console.log("Failed delete")
        console.error("Failed to delete customer:", err);
      }); // Use console.error to log errors
  };

  return (
    <>
      <Navbar />
      <div className="customer-container">
        <div className="crud-form-container">
          <h2>Customers</h2>
          <div className="create-button">
            <a href='/createcustomer'><img className='create-icon'  src={CreateIcon} alt='create' /></a>
          </div>
          <table className="table">
  <thead>
    <tr>
      <th>Customer ID</th>
      <th>Name</th>
      <th>Age</th>
      <th>Email</th>
      <th>Phone No</th>
      <th>Address</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {data.map((customer, index) => (
      <tr key={index}>
        <td>{customer.customer_id}</td>
        <td><a href={`/readcustomer/${customer.customer_id}`} className='customer-link'>{customer.name}</a></td>
        <td>{customer.Age}</td>
        <td>{customer.Email}</td>
        <td>{customer.phone_number}</td>
        <td>{customer.address}</td>
        <td>
        
          <a href={`/updatecustomer/${customer.customer_id}`}><img className='edit-button-img' src={EditIcon} alt='Edit'/></a>
  
          <img src={DeleteIcon} className='delete-Icon-btn' alt='delete' onClick={() => handleDelete(customer.customer_id,customer.name)} />
          
        </td>
      </tr>
    ))}
  </tbody>
</table>

        </div>
      </div>
    </>
  );
}
