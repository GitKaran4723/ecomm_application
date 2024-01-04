import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Navbar from './suppliernavbar';
import './reports.css';
import axios from 'axios';

function RainfallChart() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8081/products')
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Create a new array to prepare data for the chart
  const data = products.map((product) => ({
    Products: product.product_name,
    Num_pro_sold: product.Stock_quantity, // Assuming Stock_quantity represents sold quantity
    Num_pro_bought: product.bought_quantity, // Assuming Purchased_quantity represents bought quantity
  }));
  

  return (
    <>
      <Navbar />
      <div className='charts-container'>
        <h1>Products and Selling</h1>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 40, left: 40, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Products" />
            <YAxis label={{ value: 'Quantity', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Num_pro_bought" fill="#88844f" name="Bought" />
            <Bar dataKey="Num_pro_sold" fill="#000080" name="Stock" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default RainfallChart;
