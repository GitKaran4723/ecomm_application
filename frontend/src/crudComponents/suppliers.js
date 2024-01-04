import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './employees.css'; 
import { Link } from 'react-router-dom';
import Navbar from './crudnavigaationManager'; 

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8081/suppliers') 
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error(err)); 
  }, []);

  const handleDelete = (id,name) => {
    alert('Are you sure You want to delete '+ name);
    console.log(id);
    axios
      .delete(`http://localhost:8081/deletesupplier/${id}`) // Replace 'customer' with 'employee'
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
          <h2>Suppliers</h2> 
          <div className="create-button">
            <button className="btn btn-success">
              <Link to="/createsupplier"> 
                Create +
              </Link>
            </button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Supplier ID</th> 
                <th>Supplier Name</th>
                <th>Contact Person</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((employee, index) => (
                <tr key={index}>
                  <td>{employee.supplierid}</td> 
                  <td>{employee.suppliername}</td>
                  <td>{employee.contactpersonname}</td>
                  <td>{employee.phoneNum}</td>
                  <td>{employee.email}</td>
                  <td>
                    <button className="btn read">
                      <Link to={`/readsupplier/${employee.supplierid}`}> 
                        Read
                      </Link>
                    </button>
                    <button className="btn edit">
                      <Link to={`/updatesupplier/${employee.supplierid}`}>Edit</Link> 
                    </button>

                    <button onClick={() => handleDelete(employee.supplierid,employee.suppliername)} className="btn delete">
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
