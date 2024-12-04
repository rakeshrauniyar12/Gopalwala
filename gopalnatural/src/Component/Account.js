import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthProvider";
import address from "../Assets/address.png";
import profile from "../Assets/profile.png";
import orders from "../Assets/orders.png";
import contactus from "../Assets/contactus.png";
import logoutlogo from "../Assets/logout.png";
import { useNavigate, useLocation } from "react-router-dom";
import "../Style/Account.css";

import { toast } from "react-toastify";

const Account = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  
 

  return (
    <div className="account-main">
      <h1
        style={{
          fontWeight: "lighter",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        My Account
      </h1>
      <div className="accountOptions">
        <div
          className="accountOptionsDiv"
          onClick={() => navigate("/account/profile")}
        >
          <div className="optionDivImage">
            <img src={profile} alt="profile" />
          </div>
          <div className="optionDivInfo">
            <h3>Profile</h3>
            <p>Edit name, password and phone number</p>
          </div>
        </div>
        <div className="accountOptionsDiv" onClick={() => navigate("/account/orders")}>
          <div className="optionDivImage">
            <img src={orders} alt="orders" />
          </div>
          <div className="optionDivInfo">
            <h3>Orders</h3>
            <p>Track, return, or buy again</p>
          </div>
        </div>
        <div className="accountOptionsDiv" onClick={() => navigate("/address")}>
          <div className="optionDivImage">
            <img src={address} alt="address" />
          </div>
          <div className="optionDivInfo">
            <h3>Addresses</h3>
            <p>Edit and add new address</p>
          </div>
        </div>
        <div
          className="accountOptionsDiv"
          onClick={() => navigate("/contactus")}
        >
          <div className="optionDivImage">
            <img src={contactus} alt="contactus" />
          </div>
          <div className="optionDivInfo">
            <h3>Contact Us</h3>
            <p>Ask your doubts</p>
          </div>
        </div>
        <div className="accountOptionsDiv">
          <div className="optionDivImage">
            <img src={logoutlogo} alt="logout" />
          </div>
          <div
            className="optionDivInfo"
            style={{
              display: "flex",
              alignItems: "center",
            }}
             onClick={()=>{
              logout()
              navigate("/")
             }}
          >
            <h3 style={{ color: "#EF314C", fontSize: "20px" }}>Logout</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;