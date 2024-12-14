import React, { useState } from "react";
import "../Style/Login.css";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import axios from "axios"; // Import Axios for API requests
import { registerUser,registerUserWithGoogle } from "../backend";
import { toast } from "react-toastify";
import { GoogleAuthProvider,signInWithPopup } from 'firebase/auth';
import { auth } from './Firebase';
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const {login} = useAuth();
  const navigate = useNavigate();
  const [isRotated, setIsRotated] = useState(false);
  const [showSociety, setShowSociety] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    societyName: "Select your society", // Default society name
  });

  const handleRotate = () => {
    setIsRotated((prev) => !prev);
  };
  const googleLogin = async ()=>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth,provider).then(async (result)=>{
    const userDetails= await registerUserWithGoogle(result.user.email);
    login(userDetails.data.token,userDetails.data.user._id);
    navigate("/");
    });
  }
  const handleShowSociety = () => {
    setShowSociety((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSocietySelect = (society) => {
    setFormData((prevData) => ({
      ...prevData,
      societyName: society,
    }));
    setShowSociety(false);
    setIsRotated(false);
  };

  const handleRegister = async () => {
    const { email, password, confirmPassword, societyName } = formData;

    // Basic Validation
    if (!email || !password || !confirmPassword || !societyName) {
      toast.warn("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      toast.warn("Passwords do not match");
      return;
    }

    try {
      const userSuccessfullyRegistered = await registerUser(email, password, societyName);

      if (userSuccessfullyRegistered) {
        toast.success("Registered Successfully");

        // Reset form fields after successful registration
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
          societyName: "Select your society", // Reset to default value
        });
      } else {
        toast.error("Facing some server problem!");
      }
    } catch (error) {
      toast.error("An error occurred during registration");
    }
  };

  return (
    <div className="login-main-container">
      <div className="login-content">
        <div className="login-content-1">
          {/* <h1 className="login-h1">Welcome Back</h1> */}
          <p>Please enter your details</p>
              {/* Updated society selection */}
          <div className="select-society">
            <p>{formData.societyName ? `${formData.societyName}` : "Select Your Society"}</p>
            <div
              className="society-selection-box"
              onClick={() => {
                handleRotate();
                handleShowSociety();
              }}
            >
              <RiArrowDropDownLine
                style={{
                  fontSize: "60px",
                  transform: isRotated ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>

          {showSociety && (
            <div className="society-dropdown">
              {[
                "Select Your Society",
                 "OUCOLONY",
                 "OUTEMPLE",
                 "WESTERN PLAZA",
                 "MANIKONDA",
                 "PUPPALAGUDA",
                 "KHAJAGUDA",
                 "AYYAPPA SOCIETY",
                 "KOKAPET",
                 "APARNA CYBERZON",
                 "APARNA CYBERLIFE",
                 "APARNA SAROVAR ZENITH",
                 "APARNA SERENE PARK",
                 "APARNA CYBERSCAPE",
                 "APARNA LUXOR PARK",
                 "APARNA KANOPY MARIGOLD",
                 "APARNA SERENITY",
                "Tata Promont",
                "Sobha Neopolis",
                "Embassy Lake",
                "Felicity Engrace",
                "Sattva Aeropolis",
                "Suncity",
                "Grey Stone",
              ].map((society) => (
                <p
                  key={society}
                  onClick={() => handleSocietySelect(society)}
                  style={{ cursor: "pointer" }}
                >
                  {society}
                </p>
              ))}
            </div>
          )}

          <div className="login-content-input-1">
            <input
              name="email"
              placeholder="Enter Email ID"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="login-content-input-1">
            <input
              name="password"
              type="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="login-content-input-1">
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </div>

       
          <div className="login-content-input-3">
            <input type="checkbox" />
            <p>Remember me for 30 Days</p>
          </div>

          <button className="login-content-btn" onClick={handleRegister}>
            Register
          </button>

          <div className="login-footer-content">
            <div className="login-content-google" onClick={googleLogin}>
              <p>Sign in with Google</p>
              <FcGoogle style={{ height: "30px", width: "30px" }} />
            </div>
            <p style={{ marginTop: "20px" }}>
              I have an account?{" "}
              <Link to={"/login"} className="login-forgot">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
