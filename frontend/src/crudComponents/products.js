import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './employees.css'; 
import { Link } from 'react-router-dom';
import Navbar from './crudnavigaationManager'; 

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8081/products') 
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error(err)); 
  }, []);

  const handleDelete = (employee_id,name) => {
    alert('Are you sure You want to delete '+ name);
    console.log(employee_id);
    axios
      .delete(`http://localhost:8081/deleteproduct/${employee_id}`) // Replace 'customer' with 'employee'
      .then((res) => {
        console.log("Deletion response:", res);
        window.location.reload();
      })
      .catch((err) => {
        console.log("Failed delete");
        console.error("Failed to delete employee:", err);
      }); // Use console.error to log errors
  };

  return (
    <>
      <Navbar />
      <div className="employee-container"> 
        <div className="crud-form-container-employee">
          <h2>Products</h2> 
          <div className="create-button">
            <button className="btn btn-success">
              <Link to="/createproduct"> 
                Create +
              </Link>
            </button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Product ID</th> 
                <th>Product Name</th>
                <th>Category</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((employee, index) => (
                <tr key={index}>
                  <td>{employee.product_id}</td> 
                  <td>{employee.product_name}</td>
                  <td>{employee.category}</td>
                  <td>{employee.description}</td>
                  <td>
                    <button className="btn read">
                      <Link to={`/readproduct/${employee.product_id}`}> 
                        Read
                      </Link>
                    </button>
                    <button className="btn edit">
                      <Link to={`/updateproduct/${employee.product_id}`}>Edit</Link> 
                    </button>

                    <button onClick={() => handleDelete(employee.product_id,employee.product_name)} className="btn delete">
                      Delete
                    </button>
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
