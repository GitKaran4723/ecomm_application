import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './reademployee.css';

function Read() {
    const {id} = useParams();
    const [supplier,setSupplier] = useState([]) 
    
    useEffect(()=>{
        axios.get('http://localhost:8081/readsupplier/'+id)
        .then(res=>{
            console.log(res.data)
            setSupplier(res.data[0])
        })
        .catch(err=> console.log("There is error:"+err))
    },[id])

  return (
    <div className='body-container'>
        <div className='data-container'>
            <h2 className='heading-details'>Supplier Details </h2>
            <h2>Supplier ID: {supplier.supplierid}</h2>
            <h2>Supplier Name: {supplier.suppliername}</h2>
            <h2>Contact Person: {supplier.contactpersonname}</h2>
            <h2>Email: {supplier.email}</h2>
            <h2>Phone Number: {supplier.phoneNum}</h2>
            <h2>Address: {supplier.address}</h2>
            <h2>Password: {supplier.password}</h2>
           <Link to='/readsuppliers' style={{color:'black'}}>Back</Link>
        </div>
    </div>
  )
}

export default Read