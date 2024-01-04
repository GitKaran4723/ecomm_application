import React from 'react';
import Navbar from './navbar';
import  './home.css';

function Home() {
  return (
    <div className='container'>
        <Navbar/>
        <h1 className='tag-name sentence'>Wecome to the world of Fashion</h1>
        <h2 className='bottom-tag sentence'>All that you want available here</h2> 
    </div>
  )
}

export default Home