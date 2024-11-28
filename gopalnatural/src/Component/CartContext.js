// CartContext.js
import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]); // Ensure initial value is an empty array

  // Function to update cart products
  const updateCart = (products) => {
    setCartProducts(products || []); // Fallback to an empty array if `products` is null or undefined
  };

  // Add a product to the cart
  const addProduct = (product) => {
    setCartProducts((prev) => (Array.isArray(prev) ? [...prev, product] : [product]));
  };

  // Remove a product from the cart
  const removeProduct = (productId) => {
    setCartProducts((prev) => (Array.isArray(prev) ? prev.filter((product) => product.id !== productId) : []));
  };

  return (
    <CartContext.Provider
      value={{ cartProducts, updateCart, addProduct, removeProduct }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use CartContext
export const useCart = () => {
  return useContext(CartContext);
};
