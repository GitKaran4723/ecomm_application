import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './readCustomer.css';

function Read() {
    const {id} = useParams();
    const [customer,setCustomer] = useState([]) 
    useEffect(()=>{
        axios.get('http://localhost:8081/readcustomer/'+id)
        .then(res=>{
            console.log(res.data)
            setCustomer(res.data[0])
        })
        .catch(err=> console.log("There is error:"+err))
    },[id])
  return (
    <div className='body-container'>
        <div className='data-container'>
            <h2 className='heading-details'>Customer Details </h2>
            <h2>Customer ID: {customer.customer_id}</h2>
            <h2>Name: {customer.name}</h2>
            <h2>Age: {customer.Age}</h2>
            <h2>Email: {customer.Email}</h2>
            <h2>Phone Number: {customer.phone_number}</h2>
            <h2>Address: {customer.address}</h2>
            <h2>Password: {customer.password}</h2>
           <Link to='/readcustomers' style={{color:'black'}}>Back</Link>
        </div>
    </div>
  )
}

export default Read