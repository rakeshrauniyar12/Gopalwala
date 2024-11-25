import React from 'react';
import "../Style/Login.css"
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const Login = ()=>{
    return(
        <div className='login-main-container'>
           <div className='login-content'>
            <div className='login-content-1'>
                <h1 className='login-h1'>Welcome Back</h1>
                <p>Please enter your details</p>
                <div className='login-content-input-1'>
                <input placeholder='Enter Email ID'/>
                </div>
                <div className='login-content-input-1'>
                <input placeholder='Enter Password'/>
                </div>
                <div className='login-content-input-3'>
                    <input type='checkbox'/>
                    <p>Remember me for 30 Days</p>
                </div>
                <button className='login-content-btn'>Login</button>
                <div className='login-footer-content'>
                <div className='login-content-google'>
                    <p>Sign in with google</p>
                   <FcGoogle style={{height:"30px",width:"30px"}}/>
                </div>
               <Link className='login-forgot'>Forgot your Password?</Link>
               <p style={{marginTop:"20px"}}>Don't have an account ? <Link to={"/register"} className='login-forgot'>Sign Up</Link></p>
                </div>
           
            </div>
           </div>
        </div>
    )
}

export default Login;