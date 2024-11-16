import React from 'react';
import header from "../Assets/Navbar/header.png"
import "../Style/Home.css"
const Home = ()=>{
    return (
        <div className='home-container'>
            <div className='header-section'>
                 <div className='header-content'>
                    <p className='header-p'>Eat organic food to maintain your health.</p>
                    <p className='repu-p'>A reputable brand dedicated to providing organic food.</p>
                    <button className='header-btn'>Shop Now</button>
                 </div>
                </div>    
        </div>
    )
}

export default Home;