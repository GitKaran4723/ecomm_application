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
    },[]);

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

  
const welcomeMessage = "Welcomes you , "+employee.name+"!" ;
    
  return (
    <>
    <Navbar welcomeMessage={welcomeMessage} />
      <div>
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
                <td>
                  {customer.order_status === 'Delivered' ? (
                    customer.orderid
                  ) : ( customer.order_status === 'Order Recieved'?customer.orderid:(<a href={`/emporderview/${customer.orderid}/${employee.empid}`}>
                      {customer.orderid}
                    </a>)
                    
                  )}
                </td>
                <td>{customer.order_date.slice(0, 10)}</td>
                <td className={customer.order_status === 'ordered' ? '' : 'delivered_Green'}>
                  {customer.order_status}
                </td>
                <td>{customer.payment_status}</td>
                <td>&#8377; {customer.total_amount}</td>

                </tr>
                ))}
            </tbody>
        </table>

        </div>
      </div>
      </div>
    </>
    
  )
}

export default Read