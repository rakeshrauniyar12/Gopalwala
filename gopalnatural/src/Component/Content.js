import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Register from "./Register"
import Cart from "./Cart";
import Checkout from "./Checkout";
import {Subscription,SubscriptionProductPage} from "./Subscription";
import Account from "./Account";
import  { AddAddressPage, AddressContent, UpdateAddressPage } from "./Address";
import { Orders } from "./Orders";
import OrderPlaced from "./OrderPlaced";
const Content = () => {
 
  return (
    <div style={{ width: "100%", margin: "auto",}}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/subscription/:id" element={<Subscription />} />
        <Route path="/subscription" element={<SubscriptionProductPage />} />
        <Route path="/account" element={<Account />} />
        <Route path="/address" element={<AddressContent />} />
        <Route path="/address/addaddress" element={<AddAddressPage />} />
        <Route path="/address/updateaddress/:id" element={<UpdateAddressPage />} />
        <Route path="/account/orders" element={<Orders />} />
        <Route path="/orderplaced" element={<OrderPlaced />} />
      </Routes>
    </div>
  );
};

export default Content;