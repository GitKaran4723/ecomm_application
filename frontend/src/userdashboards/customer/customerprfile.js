import React, { useEffect, useState } from 'react'
import Navbar from './customernavbar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/userdashboard.css';



function customerdashboard() {
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

    const welcomeMessage = "Welcomes you , "+customer.name+"!" ;


   

  return (
    <>
        <Navbar welcomeMessage={welcomeMessage} />
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
            <div className='btncontainer'>
                    <button onClick={()=>window.history.back()} className='btn btn-back'>Back</button>
                        <button className="btn btn-edit">
                        <Link to={`/updateselfcustomer/${customer.customer_id}`}>Edit</Link>
                    </button>
            </div>
                
        </div>
    </div>
    </>
  )
}

export default customerdashboard