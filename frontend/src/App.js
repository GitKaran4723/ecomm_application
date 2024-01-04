import React from "react";
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Reports from "./components/reports";
import Signup from "./components/pageComponents/signup";
import Contact from "./components/pageComponents/contactform";
import Customers from "./crudComponents/customers";
import Employees from "./crudComponents/employees";
import Products from "./crudComponents/products";
import Suppliers from "./crudComponents/suppliers";
import Orders from "./crudComponents/orders";
import Payments from "./crudComponents/payments";
import Login from "./components/pageComponents/loginoptions";
import CreateCustomer from "./components/managerCustomerforms/createCustomer";
import Createemployee from "./components/managerCustomerforms/createemployee";
import Createproduct from "./components/managerCustomerforms/createproduct";
import Createsupplier from "./components/managerCustomerforms/createsupplier";
import ReadCustomer from "./components/managerCustomerforms/readcustomer";
import ReadEmployee from "./components/managerCustomerforms/reademployee";
import ReadProduct from "./components/managerCustomerforms/readproduct";
import ReadSupplier from "./components/managerCustomerforms/readsuppliers";
import UpdateCustomer from "./components/managerCustomerforms/updatecustomer";
import Updateemployee from "./components/managerCustomerforms/updateemployee";
import Updateproduct from "./components/managerCustomerforms/updateproduct";
import Updatesupplier from "./components/managerCustomerforms/updatesupplier";
//user Dashboards
import Customerdashboard from "./userdashboards/customer/customerdashboard";
import Customerprofile from "./userdashboards/customer/customerprfile";
import Customercart from "./userdashboards/customer/customercart";
import Customerorders from "./userdashboards/customer/customerorders";
import Customerupdateself from "./userdashboards/customer/customerupdateself";
import Employeedashboard from "./userdashboards/employee/employeedashboard";
import Employeeorder from "./userdashboards/employee/employeeorders";
import Emporderview from "./userdashboards/employee/emporderview";
import Supplierdashboard from "./userdashboards/supplier/supplierdashboard";
import Supplierstockview from "./userdashboards/supplier/supplierstockview";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/readcustomers" element={<Customers/>} />
          <Route path="/reademployees" element={<Employees/>} />
          <Route path="/readproducts" element={<Products/>} />
          <Route path="/readsuppliers" element={<Suppliers/>} />
          <Route path="/readorders" element={<Orders/>} />
          <Route path="/readpayments" element={<Payments/>} />
          <Route path="/createcustomer" element={<CreateCustomer/>} />
          <Route path="/createemployee" element={<Createemployee/>} />
          <Route path="/createproduct" element={<Createproduct/>} />
          <Route path="/createsupplier" element={<Createsupplier/>} />
          <Route path="/readcustomer/:id" element={<ReadCustomer/>} />
          <Route path="/reademployee/:id" element={<ReadEmployee/>} />
          <Route path="/readproduct/:id" element={<ReadProduct />}/>
          <Route path="/readsupplier/:id" element={<ReadSupplier/>}/>
          <Route path="/updatecustomer/:id" element={<UpdateCustomer/>} />
          <Route path="/updateemployee/:id" element={<Updateemployee/>} />
          <Route path="/updateemployee/:id" element={<Updateemployee/>} />
          <Route path="/updateproduct/:id" element={<Updateproduct/>} />
          <Route path="/updatesupplier/:id" element={<Updatesupplier/>}/>
          //Dashboards
          <Route path="/customerdashboard/:id" element={<Customerdashboard />}/>
          <Route path="/customerprofile/:id" element={<Customerprofile />}/>
          <Route path="/customercart/:id" element={<Customercart />}/>
          <Route path="/customerorders/:id" element={<Customerorders />}/>
          <Route path="/updateselfcustomer/:id" element={<Customerupdateself />}/>
          <Route path="/employeeorders/:id" element={<Employeeorder />}/>
          <Route path="/employeeprofile/:id" element={<Employeedashboard />}/>
          <Route path="/emporderview/:id/:empid" element={<Emporderview />}/>
          <Route path="/supplierdashboard/:id" element={<Supplierdashboard />}/>
          <Route path="/productstock/:id" element={<Supplierstockview />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
