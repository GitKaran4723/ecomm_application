import React, { useState } from "react";
import "./loginoption.css"; // You can add your CSS styles here
import Navbar from "../navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function App() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('customer');
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // ...
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      selectedRole === "Manager" &&
      username === "karan" &&
      password === "123456"
    ) {
      console.log("Login Successful");
      navigate("/readcustomers");
    } else if (selectedRole === "customer") {
      try {
        const response = await axios.get("http://localhost:8081/customers");
        const data = response.data;
        console.log(data);
        // Assuming customerData is an array of customer objects with 'Email' and 'password' properties
        const authenticatedCustomer = data.find(
          (customer) =>
            customer.Email === username && customer.password === password
        );

        if (authenticatedCustomer) {
          const id = authenticatedCustomer.customer_id;
          console.log("Login Successful");
          
          navigate("/customerdashboard/" + id);
        } else {
          console.log("Login Failed");
          document.getElementById("error").innerText = "Authentication Failed";
        }
      } catch (error) {
        console.error(error);
      }
    } else if (selectedRole === "employee") {
      try {
        const response = await axios.get("http://localhost:8081/employees");
        const data = response.data;
        console.log(data);
        // Assuming customerData is an array of customer objects with 'Email' and 'password' properties
        const authenticatedemployee = data.find(
          (customer) =>
            customer.email === username && customer.password === password
        );

        if (authenticatedemployee) {
          const id = authenticatedemployee.empid;
          console.log("Login Successful");
          navigate("/employeeorders/"+ id);
        } else {
          console.log("Login Failed");
          document.getElementById("error").innerText = "Authentication Failed";
        }
      } catch (error) {
        console.error(error);
      }
    } else if (selectedRole === "supplier") {
      try {
        const response = await axios.get("http://localhost:8081/suppliers");
        const data = response.data;
        console.log(data);
        const authenticatedSupplier = data.find(
          (customer) =>
            customer.email === username && customer.password === password
        );

        if (authenticatedSupplier) {
          const id = authenticatedSupplier.supplierid;
          console.log("Login Successful");
          navigate("/supplierdashboard/" + id);
        } else {
          console.log("Login Failed");
          document.getElementById("error").innerText = "Authentication Failed";
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Login Failed");
      document.getElementById("error").innerText = "Authentication Failed";
    }
    console.log("selectedRole:", selectedRole);
    console.log("username: ", username);
    console.log("password: ", password);
  };

  // ...

  return (
    <>
      <Navbar />
      <div className="App">
        <header className="App-header">
          <h1>Login as</h1>
          <div className="options-container">
            <div
              className={`option ${
                selectedRole === "customer" ? "selected" : ""
              }`}
              onClick={() => handleRoleSelect("customer")}
            >
              Customer
            </div>

            <div
              className={`option ${
                selectedRole === "supplier" ? "selected" : ""
              }`}
              onClick={() => handleRoleSelect("supplier")}
            >
              Supplier
            </div>

            <div
              className={`option ${
                selectedRole === "employee" ? "selected" : ""
              }`}
              onClick={() => handleRoleSelect("employee")}
            >
              Employee
            </div>

            <div
              className={`option ${
                selectedRole === "Manager" ? "selected" : ""
              }`}
              onClick={() => handleRoleSelect("Manager")}
            >
              Manager
            </div>
          </div>
          {selectedRole && (
            <form onSubmit={handleSubmit}>
              <label>
                Username:
                <input
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder={`Enter ${selectedRole} Username`}
                />
              </label>
              <label>
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder={`Enter ${selectedRole} Password`}
                />
              </label>
              <p className="wrongUsername" id="error"></p>
              <button type="submit">Login</button>
            </form>
          )}
        </header>
      </div>
    </>
  );
}

export default App;
