import React, { useState,useEffect } from 'react';
import "../Style/Login.css";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for API requests
import { toast } from "react-toastify"; // Import toast for notifications
import { getUser, loginUser,registerUserWithGoogle } from '../backend';
import Header from './Header';
import {useAuth} from "./AuthProvider";
import { GoogleAuthProvider,signInWithPopup } from 'firebase/auth';
import { auth } from './Firebase';
import { GoogleLogin } from '@react-oauth/google';
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Loading state for login button
  const navigate = useNavigate(); // To navigate to other pages after login
  const { login,currentUser } = useAuth();
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
 
  const googleLogin = async ()=>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth,provider).then(async (result)=>{
    const userDetails= await registerUserWithGoogle(result.user.email);
    login(userDetails.data.token,userDetails.data.user._id);
    navigate("/");
    });
  }
  // const googleAuth = async () => {
  //   localStorage.setItem("signInMethod","google")
  //   window.open(
  //     "http://localhost:8080/auth/google/callback",
  //     "_self"
  //   );
  // };
  
  
  // Handle login process
  const handleLogin = async () => {
    localStorage.setItem("signInMethod","manual")
    const { email, password } = formData;

    // Basic Validation
    if (!email || !password) {
      toast.warn("Please enter both email and password");
      return;
    }

    setLoading(true); // Set loading to true when the login process starts

    try {
      // Make API request to backend (ensure the endpoint is correct)
    const loginData =  await loginUser(email,password);
     console.log(loginData.data.user._id);
      if (loginData.data.msg==="Login successful") {
        toast.success("Login successful!");
        setFormData(
            {
                email: "",
                password: "",
              }
        )
        // Here you would typically store the token in cookies (as backend sets it in a cookie)
        // But if you need to check locally, storing in localStorage is an option (not recommended for production).
        login(loginData.data.token,loginData.data.user._id);
       
        // Navigate to the dashboard or home page
       
        navigate("/"); // Replace with your route after login
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Check if the user is already logged in by checking the token
 

  return (
    <div className='login-main-container'>
      <div className='login-content'>
        <div className='login-content-1'>
          <p>Please enter your details</p>
          <div className='login-content-input-1'>
            <input
              type="email"
              name="email"
              placeholder='Enter Email ID'
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className='login-content-input-1'>
            <input
              type="password"
              name="password"
              placeholder='Enter Password'
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className='login-content-input-3'>
            <input type='checkbox' />
            <p>Remember me for 30 Days</p>
          </div>
          <button
            className='login-content-btn'
            onClick={handleLogin}
            disabled={loading} // Disable button while loading
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className='login-footer-content'>
            <div className='login-content-google' onClick={googleLogin}>
              <p>Sign in with Google</p>
              <FcGoogle style={{ height: "30px", width: "30px" }} />
            </div>
            <Link to="/account/forgotpassword" className='login-forgot'>
              Forgot your Password?
            </Link>
            <p style={{ marginTop: "20px" }}>
              Don't have an account?{" "}
              <Link to="/register" className='login-forgot'>Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
