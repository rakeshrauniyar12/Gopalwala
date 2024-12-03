import React, { useEffect, useState } from "react";
import "../Style/Cart.css";
import { IoMdClose } from "react-icons/io";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"; // Import icons
import { Link, useNavigate } from "react-router-dom";
import {
  deleteCartProduct,
  getAllCartProduct,
  updateCartProduct,
} from "../backend";
import { Navigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import { useCart } from "./CartContext";

const Cart = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { removeProduct, updateCart } = useCart();
   const navigate = useNavigate();
  const fetchProducts = async () => {
    try {
      const product = await getAllCartProduct();
      setProducts([...product]);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDeleteCartProduct = async (product) => {
    try {
      const res = await deleteCartProduct(product._id); // Await the delete operation
      if (res) {
        toast.success("Product deleted from cart.");
        removeProduct(product._id);
        setProducts(res.data.remainingProducts);
      } else {
        toast.error("Failed to delete product from cart.");
      }
    } catch (error) {
      toast.error("Getting server error!");
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdateCartProduct = async (product, newQuantity) => {
    if (newQuantity <= 0) {
      toast.error("Quantity cannot be less than 1.");
      return;
    }
    try {
      const updatedProduct = await updateCartProduct(product._id, {
        productQuantity: newQuantity,
      });
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p._id === product._id ? { ...p, productQuantity: newQuantity } : p
        )
      );
      updateCart(updatedProduct); // Update context if needed
      toast.success("Quantity updated successfully.");
    } catch (error) {
      toast.error("Failed to update product quantity.");
      console.error("Error updating product quantity:", error);
    }
  };
  // Calculate total price
  const totalProductPrice = products.reduce(
    (total, product) =>
      total + product.productPrice * product.productQuantity,
    0
  );

  // SGST and CGST calculations
  const tax = totalProductPrice * 0.06;
  const totalPriceWithTax = totalProductPrice + 2 * tax;
  const goToCheckout = ()=>{
    if(products.length===0){
     toast.warn("Your cart is empty!")
    } else{
     navigate("/checkout",{ state: { totalPriceWithTax, products } })
    }
}
  return (
    <div className="cart-main-container">
      {!isMobile ? (
        <>
          <div className="cart-header">
            <div>
              <p>Product</p>
            </div>
            <div>
              <p>Unit</p>
            </div>
            <div>
              <p>Price</p>
            </div>
            <div>
              <p>Quantity</p>
            </div>
            <div>
              <p>Total</p>
            </div>
            <div>
              <p>Remove</p>
            </div>
          </div>

          <div className="cart-product-append">
            {loading ? (
              <div className="spinner-container">
                <ClipLoader color={"#36D7B7"} loading={loading} size={50} />
              </div>
            ) : products.length === 0 ? (
              <div
                style={{
                  width: "30%",
                  margin: "auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "200px",
                }}
              >
                <p style={{ fontSize: "25px", fontWeight: "600", color: "red" }}>
                  Your cart is empty.
                </p>
              </div>
            ) : (
              products.map((product, index) => (
                <div key={index} className="cart-product">
                  <div>
                    <div className="cart-product-image">
                      <img
                        src={product.productImage}
                        alt={product.productName}
                      />
                    </div>
                    <p style={{ color: "#3d8e41" }}>{product.productName}</p>
                  </div>
                  <div>
                    <p>{product.productUnit}</p>
                  </div>
                  <div>
                    <p>{`₹ ${product.productPrice}`}</p>
                  </div>
                  <div>
                    <div className="quantity-controls">
                      <button
                        onClick={() =>
                          handleUpdateCartProduct(
                            product,
                            product.productQuantity - 1
                          )
                        }
                      >
                        <AiOutlineMinus />
                      </button>
                      <p>{product.productQuantity}</p>
                      <button
                        onClick={() =>
                          handleUpdateCartProduct(
                            product,
                            product.productQuantity + 1
                          )
                        }
                      >
                        <AiOutlinePlus />
                      </button>
                    </div>
                  </div>
                  <div>
                    <p>{`₹ ${
                      product.productPrice * product.productQuantity
                    }`}</p>
                  </div>
                  <div onClick={() => handleDeleteCartProduct(product)}>
                    <IoMdClose
                      style={{
                        color: "#3d8e41",
                        fontSize: "20px",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <>
          {/* Mobile Layout */}
          <div className="cart-product-mobile">
            {loading ? (
              <div className="spinner-container">
                <ClipLoader color={"#36D7B7"} loading={loading} size={50} />
              </div>
            ) : products.length === 0 ? (
              <div
                style={{
                  width: "90%",
                  margin: "auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "200px",
                }}
              >
                <p
                  style={{
                    fontSize: "25px",
                    fontWeight: "600",
                    color: "red",
                  }}
                >
                  Your cart is empty.
                </p>
              </div>
            ) : (
              products.map((product, index) => (
                <div key={index}>
                  <div className="cart-mobile-image">
                    <img
                      src={product.productImage}
                      alt={product.productName}
                    />
                  </div>
                  <div className="cart-mobile-heading">
                    <div
                      style={{
                        borderTop: "1.6px solid #9e9e90",
                        borderBottom: "1.6px solid #9e9e90",
                      }}
                    >
                      <b>Product:</b>
                      <p>{product.productName}</p>
                    </div>
                    <div>
                      <b>Unit:</b>
                      <p>{product.productUnit}</p>
                    </div>
                    <div
                      style={{
                        borderTop: "1.6px solid #9e9e90",
                        borderBottom: "1.6px solid #9e9e90",
                      }}
                    >
                      <b>Price:</b>
                      <p>{product.productPrice}</p>
                    </div>
                    <div>
                      <b>Quantity:</b>
                      <div className="quantity-controls">
                        <button
                          onClick={() =>
                            handleUpdateCartProduct(
                              product,
                              product.productQuantity - 1
                            )
                          }
                        >
                          <AiOutlineMinus />
                        </button>
                        <p>{product.productQuantity}</p>
                        <button
                          onClick={() =>
                            handleUpdateCartProduct(
                              product,
                              product.productQuantity + 1
                            )
                          }
                        >
                          <AiOutlinePlus />
                        </button>
                      </div>
                    </div>
                    <div
                      style={{
                        borderTop: "1.6px solid #9e9e90",
                        borderBottom: "1.6px solid #9e9e90",
                      }}
                    >
                      <b>Total:</b>
                      <p>
                        {product.productQuantity * product.productPrice}
                      </p>
                    </div>
                    <div style={{ borderBottom: "1.6px solid #9e9e90" }}>
                      <b>Remove:</b>
                      <div onClick={() => handleDeleteCartProduct(product)}>
                        <IoMdClose
                          style={{
                            color: "#3d8e41",
                            fontSize: "20px",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

<div className="cart-total">
        <div className="cart-total-1">
          <p>Cart Total</p>
        </div>
        <div className="cart-total-2">
          <div>
            <p>Price Total</p>
            <p>{`₹ ${totalProductPrice.toFixed(2)}`}</p>
          </div>
          <div>
            <p>SGST</p>
            <p>{`₹ ${tax.toFixed(2)}`}</p>
          </div>
          <div>
            <p>CGST</p>
            <p>{`₹ ${tax.toFixed(2)}`}</p>
          </div>
          <div style={{ borderBottom: "none" }}>
            <p>Total</p>
            <p>{`₹ ${totalPriceWithTax.toFixed(2)}`}</p>
          </div>
          
            <button className="cart-btn" onClick={goToCheckout}>Proceed to checkout</button>
          
        </div>
      </div>
    </div>
  );
};

export default Cart;
