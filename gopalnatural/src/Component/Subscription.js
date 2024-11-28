import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Style/Subscription.css";
import { getProductById } from "../backend";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";
import { useCart } from "./CartContext";
import { deleteCartProduct, updateCartProduct } from "../backend";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"; // Import icons

const Subscription = () => {
  const { id } = useParams(); // Extract 'id' from the URL
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = window.innerWidth <= 768;
  const { cartProducts, removeProduct, updateCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [frequency, setFrequency] = useState("everyday"); // State to store frequency

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(id);
        setProducts(productData);
        setLoading(false);
      } catch (err) {
        throw err.message;
      }
    };

    fetchProduct();
  }, [id]);

  const handleDeleteCartProduct = async (product) => {
    try {
      const res = await deleteCartProduct(product._id); // Await the delete operation
      if (res) {
        toast.success("Product deleted from cart.");
        removeProduct(product._id);
        updateCart(product);
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
    console.log(newQuantity);
    setQuantity(newQuantity);
  };

  const handleFrequencyChange = (value) => {
    setFrequency(value);
  };

  return (
    <div className="subscription-container">
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
            ) : product.length === 0 ? (
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
                <p
                  style={{ fontSize: "25px", fontWeight: "600", color: "red" }}
                >
                  Your cart is empty.
                </p>
              </div>
            ) : (
              <div className="cart-product">
                <div>
                  <div className="cart-product-image">
                    <img src={product.productImage} alt={product.productName} />
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
                      onClick={() => handleUpdateCartProduct(quantity - 1)}
                    >
                      <AiOutlineMinus />
                    </button>
                    <p>{quantity}</p>
                    <button
                      onClick={() => handleUpdateCartProduct(quantity + 1)}
                    >
                      <AiOutlinePlus />
                    </button>
                  </div>
                </div>
                <div>
                  <p>{`₹ ${product.productPrice * product.productQuantity}`}</p>
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
            ) : product.length === 0 ? (
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
              <div>
                <div className="cart-mobile-image">
                  <img src={product.productImage} alt={product.productName} />
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
                    <p>{product.productQuantity * product.productPrice}</p>
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
            )}
          </div>
        </>
      )}

      <div className="select-options">
        <h1 className="option-h1">How often do you want to receive this item</h1>
        <div className="options-btn">
        <div>
          <button className="op-btn" onClick={() => handleFrequencyChange("everyday")}>Every Day</button>
        </div>
        <div>
          <button className="op-btn" onClick={() => handleFrequencyChange("custom")}>Custom</button>
        </div>
        <div>
          <button className="op-btn" onClick={() => handleFrequencyChange("oninterval")}>On Interval</button>
        </div>
        </div>
        {frequency === "everyday" && (
          <div>
            <p>Every Day: You will receive this item every day.</p>
          </div>
        )}
        {frequency === "custom" && (
          <div>
            <p>Select the delivery date</p>
            <input type="date" />
          </div>
        )}
        {frequency === "oninterval" && (
          <div>
            <p>On Interval: Choose the delivery frequency.</p>
            <div>
              <label>Choose interval:</label>
              <select>
                <option value="weekly">Weekly</option>
                <option value="bi-weekly">Bi-weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscription;
