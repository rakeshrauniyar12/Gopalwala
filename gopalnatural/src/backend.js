import React from "react";
import axios from "axios";

let apiUrl= "https://gopalbackend.onrender.com/api";

const registerUser = async (email,password,societyName)=>{
  try {
    const response = await axios.post(
      `${apiUrl}/auth/register`,
      { email, password, societyName }
    );
    return response.data.user;
  } catch (err) {
    throw (err.response?.data?.message || "Registration failed");
  }   
}
const loginUser = async (email,password)=>{
try{
  const response = await axios.post(`${apiUrl}/auth/login`, {
    email,
    password,
  });
  return response;
} catch(err){
  throw (err.response?.data?.message || "login failed");
}
}
const getProduct = async ()=>{
    const response = await axios.get(`${apiUrl}/product/getAllProduct`);
      return response.data.products;
}
const getAllCartProduct = async ()=>{
  const cartProducts  = await axios.get(`${apiUrl}/cartProduct/getAllCartProduct`);
  console.log(cartProducts.data.products);
  return cartProducts.data.products;
}
const addToCart = async (product) => {
  try {
    // Check if the product already exists in the cart
    const checkProduct = await axios.get(
      `${apiUrl}/cartProduct/getCartProduct/${product._id}`
    );
    console.log("Product already exists in the cart:", checkProduct.data);
    return false;
  } catch (error) {
    // If the product is not found (404), attempt to add it
    if (error.response && error.response.status === 404) {
      console.log("Product not in cart, adding it...");
      try {
        const response = await axios.post(
          `${apiUrl}/cartProduct/saveCartProduct`,
          product,
          {
            headers: {
              "Content-Type": "application/json", // Specify the content type
            },
          }
        );
        return response;
      } catch (postError) {
        console.error("Error adding product to cart:", postError.message);
        throw postError;
      }
    } else {
      // Handle other errors (e.g., network issues)
      console.error("Error checking product in cart:", error.message);
      throw error;
    }
  }
};

const deleteCartProduct = async (productId)=>{
    const res= await axios.delete(`${apiUrl}/cartProduct/deleteCartProduct/${productId}`);
   return res;
}
export  {getProduct,addToCart,getAllCartProduct,deleteCartProduct,registerUser,loginUser};