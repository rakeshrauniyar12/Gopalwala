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
import { RiArrowDropDownLine } from "react-icons/ri";

const Subscription = () => {
  const { id } = useParams(); // Extract 'id' from the URL
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = window.innerWidth <= 768;
  const { cartProducts, removeProduct, updateCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [frequency, setFrequency] = useState("everyday"); // State to store frequency
  const [isRotated, setIsRotated] = useState(false);
  const [showSociety, setShowSociety] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    societyName:  "2 Days", // Default society name
  });
  const handleRotate = () => {
    setIsRotated((prev) => !prev);
  };

  const handleShowSociety = () => {
    setShowSociety((prev) => !prev);
  };
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
  const days= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
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
  const handleSocietySelect = (society) => {
    setFormData((prevData) => ({
      ...prevData,
      societyName: society,
    }));
    setShowSociety(false);
    setIsRotated(false);
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
                {/* <div>
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
                </div> */}
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
        <h1 className="option-h1">
          How often do you want to receive this item
        </h1>
        <div className="options-btn">
          <div>
            <button
              className="op-btn"
              onClick={() => handleFrequencyChange("everyday")}
            >
              Every Day
            </button>
          </div>
          <div>
            <button
              className="op-btn"
              onClick={() => handleFrequencyChange("custom")}
            >
              Custom
            </button>
          </div>
          <div>
            <button
              className="op-btn"
              onClick={() => handleFrequencyChange("oninterval")}
            >
              On Interval
            </button>
          </div>
        </div>
        {frequency === "everyday" && (
          <div className="option-everyday">
             <div>
                    <p>Quantity</p>
                    <div className="quantity-custom">
                      <div className="quantity-controls" style={{gap:"10px"}}>
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
                  </div>
            <div>
              <p>Select the delivery date</p>
              <input type="date" />
            </div>
            <div>
              <p>Delivery Slot</p>
              <p>04:00-07:00 A.M.</p>
            </div>
            <div>
              <p>Delivery to</p>
              <p>Add Address</p>
            </div>
          </div>
        )}
        {frequency === "custom" && (
          <div>
            <div className="option-custom">
              <div>
                <p>Select the delivery date</p>
                <input type="date" />
              </div>
              <div>
                <p>End delivery date</p>
                <input type="date" />
              </div>
            </div>
            <div className="option-custom-2">
              <h2>Select Quantity</h2>
              <div className="option-custom-3">
                {days.map((day)=>(
                    <div>
                    <p>{day}</p>
                    <div className="quantity-custom">
                      <div className="quantity-controls" style={{gap:"10px"}}>
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
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {frequency === "oninterval" && (
          <div className="oninterval-div">
            <div>
               <div>
                    <p style={{marginBottom:"10px"}}>Quantity</p>
                    <div className="quantity-custom">
                      <div className="quantity-controls" style={{gap:"10px"}}>
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
                  </div>
                  <div style={{width:"40%"}}>
                    <p>Repeat Once in</p>
                    <div className="repeat-down">
            <p>{formData.societyName ? `${formData.societyName}` : "Select Your Society"}</p>
            <div
              onClick={() => {
                handleRotate();
                handleShowSociety();
              }}
            >
              <RiArrowDropDownLine
              style={{
                transform: isRotated ? "rotate(180deg)" : "rotate(0deg)",
               }}
               className="drop-dow44"
              />
            </div>
          </div>
          {showSociety && (
            <div className="society-dropdown1">
              {[
                "3 Days",
                "4 Days",
                "5 Days",
                "6 Days",
                "7 Days",
                "8 Days",
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

                    </div>
                   
            </div>
            <div className="option-custom1" style={{marginTop:"20px"}}>
              <div>
                <p>Select the delivery date</p>
                <input type="date" />
              </div>
              <div>
                <p>End delivery date</p>
                <input type="date" />
              </div>
            </div>
            <div style={{marginTop:"20px"}}>
              <p>Delivery Slot</p>
              <p>04:00-07:00 A.M.</p>
            </div>
            <div style={{marginTop:"20px"}}>
              <p>Delivery to</p>
              <p>Add Address</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscription;
