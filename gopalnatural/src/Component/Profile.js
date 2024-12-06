import React from "react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "./AuthProvider";
import "../Style/Profile.css"

const Profile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
console.log("Profile Current User",currentUser)
  const handleEditClick = (field) => {
    navigate("/loginsecurity", { state: { field } });
  };
  
  return (
   <div style={{marginBottom:"50px"}}>
      <h1 className="login-main-h1">My Profile</h1>
      <div className="login-main">
        <div className="userdpdiv">
          <div>
           <CgProfile style={{fontSize:"50px"}}/>
            <p>{currentUser?currentUser.data.data.email:""}</p>
          </div>
        </div>
        <div className="login-main-first">
          <div className="login-main-first-first">
            <label>Email</label>
            <p>{currentUser?currentUser.data.data.email:""}</p>
          </div>
        </div>
        <div className="login-main-first" style={{ borderBottom: "none" }}>
          <div className="login-main-first-first">
            <label>Password</label>
            <p>********</p>
          </div>
          <button
            onClick={() => {
              navigate("/forgotpassword");
            }}
            className="login-main-first-second"
          >
            Edit
          </button>
        </div>
      </div>
      </div>
  );
};

export default Profile;
