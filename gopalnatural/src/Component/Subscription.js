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
import { Link } from "react-router-dom";


const Subscription = () => {
  const { id } = useParams(); // Extract 'id' from the URL
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = window.innerWidth <= 768;
  const [frequency, setFrequency] = useState("everyday"); // State to store frequency
  const [selectedDates, setSelectedDates] = useState([]); // State to store selected dates and their quantities
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedDates1, setSelectedDates1] = useState([]);

  const handleRangeSelection = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
      alert("End date cannot be earlier than the start date.");
      return;
    }
    const diffInDays = (end - start) / (1000 * 60 * 60 * 24);

    if (diffInDays < 1) {
      alert("Please select a range of at least two days.");
      return;
    }

    const dates = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      dates.push({
        date: d.toISOString().split("T")[0],
        quantity: 1, // default quantity
      });
    }

    setSelectedDates(dates);
  };

  const updateQuantity1 = (date, change) => {
    setSelectedDates((prev) =>
      prev.map((d) =>
        d.date === date ? { ...d, quantity: Math.max(d.quantity + change, 1) } : d
      )
    );
  };

  const handleRemoveDate1 = (date) => {
    if (selectedDates.length <= 2) {
      alert("You must have at least two selected dates.");
      return;
    }

    setSelectedDates((prev) => prev.filter((d) => d.date !== date));
  };

  const getDayName1 = (date) => {
    const options = { weekday: "long" };
    return new Date(date).toLocaleDateString("en-US", options);
  };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(id);
        setProducts(productData);
        setLoading(false);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchProduct();
  }, [id]);

  // Handle adding dates to the selectedDates state
  const handleAddDate = (date) => {
    if (!selectedDates.some((d) => d.date === date)) {
      setSelectedDates((prevDates) => [...prevDates, { date, quantity: 1 }]);
    }
  };

  // Handle removing a date from selectedDates state
  const handleRemoveDate = (date) => {
    setSelectedDates((prevDates) => prevDates.filter((d) => d.date !== date));
  };

  // Get day name from a date
  const getDayName = (date) => {
    const dayIndex = new Date(date).getDay();
    return days[dayIndex];
  };

  // Handle frequency change
  const handleFrequencyChange = (value) => {
    setFrequency(value);
    if (value === "everyday") {
      setSelectedDates([]); // Reset selected dates for "everyday" option
    }
  };

  // Handle quantity update for a specific date
  const updateQuantity = (date, change) => {
    setSelectedDates((prevDates) =>
      prevDates.map((d) =>
        d.date === date
          ? { ...d, quantity: Math.max(1, d.quantity + change) } // Ensure quantity is at least 1
          : d
      )
    );
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
                <p style={{ fontSize: "25px", fontWeight: "600", color: "red" }}>
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
                  <p>{`₹ ${product.productPrice * product.productQuantity}`}</p>
                </div>
                <div>
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
                <div>
                  <b>Product:</b>
                  <p>{product.productName}</p>
                </div>
                <div>
                  <b>Unit:</b>
                  <p>{product.productUnit}</p>
                </div>
                <div>
                  <b>Price:</b>
                  <p>{product.productPrice}</p>
                </div>
                <div>
                  <b>Total:</b>
                  <p>{product.productQuantity * product.productPrice}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="select-options">
        <h1 className="option-h1">How often do you want to receive this item?</h1>
        <div className="options-btn">
          <button className="op-btn" onClick={() => handleFrequencyChange("everyday")}
            style={{
              backgroundColor: frequency === "everyday" ? "#3d8e41" : "#dbeac5",
              color: frequency === "everyday" ? "#ffff" : "#3d8e41",
            }}
            >
            Every Day
          </button>
          <button className="op-btn" onClick={() => handleFrequencyChange("custom")}
            style={{
              backgroundColor: frequency === "custom" ? "#3d8e41" : "#dbeac5",
              color: frequency === "custom" ? "#ffff" : "#3d8e41",
            }}
            >
            Custom
          </button>
        </div>
        {frequency === "everyday" && (
          <div className="option-everyday">
             <div>
              <div className="option-222">
            <div className="option-custom">
              <p style={{fontSize:"20px",fontWeight:"600"}}>Select the delivery date(s):</p>
              <input
                type="date"
                onChange={(e) => handleAddDate(e.target.value)}
              />
            </div>

            {selectedDates.length > 0 && (
              <div className="selected-dates">
                <p>Selected Dates:</p>
                {selectedDates.map(({ date, quantity }) => (
                  <div
                    key={date}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px",
                      border: "1px solid #ccc",
                      marginBottom: "5px",
                    }}
                  >
                    <span style={{width:"45%"}}>
                      {date} ({getDayName(date)})
                    </span>
                    <div style={{width:"25%", display: "flex", alignItems: "center" }}>
                      <AiOutlineMinus
                        className="quantity-incr"
                        onClick={() => updateQuantity(date, -1)}
                      />
                      <span style={{ margin: "0 10px", fontWeight: "bold" }}>
                        {quantity}
                      </span>
                      <AiOutlinePlus
                        className="quantity-incr"
                        onClick={() => updateQuantity(date, 1)}
                      />
                    </div>
                    <IoMdClose
                      style={{ cursor: "pointer", color: "red" }}
                      onClick={() => handleRemoveDate(date)}
                    />
                  </div>
                ))}
              </div>
            )}
            </div>
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
        <div className="option-custom1">
          <p style={{fontSize:"20px",fontWeight:"600"}}>Select the start and end date:</p>
          <div className="end-start-btn">
          <div className="end-start-btn1">
            <div>
              <p>Select start date</p>
              <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
            </div>
            <div>
              <p>Select end date</p>
              <input
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value)
             
            }
            }
          />
            </div>
           
          </div>
          <div className="rang-btn"> <button onClick={ handleRangeSelection} className="select-range">Show Dates</button></div>
          </div>
      
          {selectedDates.length > 0 && (
              <div className="selected-dates">
                <p style={{marginTop:"20px"}}>Selected Dates:</p>
                {selectedDates.map(({ date, quantity }) => (
                  <div
                    key={date}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px",
                      border: "1px solid #ccc",
                      marginBottom: "5px",
                    }}
                  >
                    <span style={{width:"45%"}}>
                      {date} ({getDayName(date)})
                    </span>
                    <div style={{width:"25%", display: "flex", alignItems: "center" }}>
                      <AiOutlineMinus
                        className="quantity-incr"
                        onClick={() => updateQuantity(date, -1)}
                      />
                      <span style={{ margin: "0 10px", fontWeight: "bold" }}>
                        {quantity}
                      </span>
                      <AiOutlinePlus
                        className="quantity-incr"
                        onClick={() => updateQuantity(date, 1)}
                      />
                    </div>
                    <IoMdClose
                      style={{ cursor: "pointer", color: "red" }}
                      onClick={() => handleRemoveDate(date)}
                    />
                  </div>
                ))}
              </div>
            )}
        </div>
        )}
      </div>
    </div>
  );
};



const SubscriptionProductPage = ()=>{
  return(
    <div className="subs-product-page-main">
      <div>
        <p style={{color:"Red",fontSize:"18px",fontWeight:"600"}}>You have not subscribed any product.</p>
        <Link to={"/"}><button className="sub-btn">Click here to subscribe product</button></Link>
      </div>
    </div>
  )
}
export {Subscription,SubscriptionProductPage};
