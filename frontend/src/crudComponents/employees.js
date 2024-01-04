import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './employees.css'; 
import { Link } from 'react-router-dom';
import Navbar from './crudnavigaationManager'; 

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8081/employees') 
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error(err)); 
  }, []);

  const handleDelete = (employee_id,name) => {
    console.log(employee_id);
    alert('Are you sure You want to delete '+ name);
    axios
      .delete(`http://localhost:8081/delete/employee/${employee_id}`) // Replace 'customer' with 'employee'
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
          <h2>Employees</h2> 
          <div className="create-button">
            <button className="btn btn-success">
              <Link to="/createemployee"> 
                Create +
              </Link>
            </button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Employee ID</th> 
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((employee, index) => (
                <tr key={index}>
                  <td>{employee.empid}</td> 
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phoneNo}</td> 
                  <td>
                    <button className="btn read">
                      <Link to={`/reademployee/${employee.empid}`}> 
                        Read
                      </Link>
                    </button>
                    <button className="btn edit">
                      <Link to={`/updateemployee/${employee.empid}`}>Edit</Link> 
                    </button>

                    <button onClick={() => handleDelete(employee.empid,employee.name)} className="btn delete">
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
