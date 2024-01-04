import React, { useEffect, useState } from 'react'
import Navbar from './employeenavbar';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';


function Read() {
    const {id} = useParams();
    const [employee,setEmployee] = useState([]) 
    
    useEffect(()=>{
        axios.get('http://localhost:8081/reademployee/'+id)
        .then(res=>{
            console.log(res.data)
            setEmployee(res.data[0])
        })
        .catch(err=> console.log("There is error:"+err))
    },[id])
  
const welcomeMessage = "Welcomes you , "+employee.name+"!" ;
    
  return (
    <>
    <Navbar welcomeMessage={welcomeMessage} />
    <div className='body-container'>
        <div className='data-container'>
            <h2 className='heading-details'>Employee Details </h2>
            <h2>Employee ID: {employee.empid}</h2>
            <h2>Name: {employee.name}</h2>
            <h2>Age: {employee.position}</h2>
            <h2>Hire Date: {employee.hiredate}</h2>
            <h2>Salary: {employee.salary}</h2>
            <h2>Address: {employee.address}</h2>
            <h2>Password: {employee.password}</h2>
           <button className='employeeprofileback' onClick={()=>{window.history.back()}}>Back</button>
        </div>
    </div>


    </>
    
  )
}

export default Read