import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../Style/Subscription.css";
import { getProductById,getSubscriptionProducts } from "../backend";
import ClipLoader from "react-spinners/ClipLoader";
import { IoMdClose } from "react-icons/io";

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"; // Import icons

import { Link } from "react-router-dom";

import DatePicker from "react-multi-date-picker";
import { useAuth } from "./AuthProvider";

const Subscription = () => {
  const { id } = useParams(); // Extract 'id' from the URL
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const {currentUser} = useAuth;
  const isMobile = window.innerWidth <= 768;
  const [frequency, setFrequency] = useState("custom"); // State to store frequency
  const [selectedDates, setSelectedDates] = useState([]);
  const [isRangeMode, setIsRangeMode] = useState(false);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const totalPrice = selectedDates.reduce(
    (sum, { quantity, price }) => {
      return sum + price; // Ensure you return the updated sum
    },
    0 // Initial value of sum
  );
  const totalPriceWithTax = totalPrice+totalPrice*0.12;
let finalObject = {
     subscriptionData: {
      productId: id,
      productImage: product.productImage,
      productName: product.productName,
      productPrice: product.productPrice,
      productQuantity: selectedDates,
      productUnit: product.productUnit
    }
}


  // Function to get the day name from a date
  const getDayName = (date) => {
    const [day, month, year] = date.split("/").map(Number);
    const parsedDate = new Date(`${year}-${month}-${day}`);
    return parsedDate.toString() === "Invalid Date"
      ? "Invalid Date"
      : days[parsedDate.getDay()];
  };

  // Generate all dates in a range (inclusive)
  const generateDatesInRange = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const dateArray = [];

    while (startDate <= endDate) {
      const day = startDate.getDate().toString().padStart(2, "0");
      const month = (startDate.getMonth() + 1).toString().padStart(2, "0");
      const year = startDate.getFullYear();

      dateArray.push(`${day}/${month}/${year}`);
      startDate.setDate(startDate.getDate() + 1); // Increment day
    }

    return dateArray;
  };

  
  const handleDateChange = (dates) => {
    let newDates = [];
  
    if (isRangeMode && dates.length === 2) {
      const start = dates[0];
      const end = dates[1];
  
      // Generate all dates in the selected range
      newDates = generateDatesInRange(start, end).map((date) => ({
        date,
        day: getDayName(date),
        quantity: 1, // Initialize with quantity 1
        price: product.productPrice, // Initial price
      }));
    } else if (!isRangeMode) {
      newDates = dates.map((date) => ({
        date: date.toString(),
        day: getDayName(date.toString()),
        quantity: 1, // Initialize with quantity 1
        price: product.productPrice, // Initial price
      }));
    }
  
    setSelectedDates((prevDates) => {
      // Avoid duplicates
      const uniqueDates = [
        ...prevDates,
        ...newDates.filter(
          (newDate) =>
            !prevDates.some((oldDate) => oldDate.date === newDate.date)
        ),
      ];
      return uniqueDates;
    });
  };

  const updateQuantity = (date, change) => {
    setSelectedDates((prevDates) =>
      prevDates.map((item) =>
        item.date === date
          ? {
              ...item,
              quantity: Math.max(0, item.quantity + change),
              price: product.productPrice * Math.max(0, item.quantity + change), // Update price
            }
          : item
      )
    );
  };
  // Function to remove a specific date
  const handleRemoveDate = (dateToRemove) => {
    setSelectedDates((prevDates) =>
      prevDates.filter((item) => item.date !== dateToRemove)
    );
  };
  // const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const navigate = useNavigate();
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

  // Handle frequency change
  const handleFrequencyChange = (value) => {
    setFrequency(value);
    if (value === "everyday") {
      setSelectedDates([]); // Reset selected dates for "everyday" option
    }
  };
  const paths="/subscription/:id"
  const goToCheckout = () => {
    navigate("/checkout",{state:{paths,finalObject,totalPriceWithTax}});
  };
  // Handle quantity update for a specific date
  // const updateQuantity = (date, change) => {
  //   setSelectedDates((prevDates) =>
  //     prevDates.map((d) =>
  //       d.date === date
  //         ? { ...d, quantity: Math.max(1, d.quantity + change) } // Ensure quantity is at least 1
  //         : d
  //     )
  //   );
  // };

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
                  <p style={{ color: "#b44700" }}>{product.productName}</p>
                </div>
                <div>
                  <p>{product.productUnit}</p>
                </div>
                <div>
                  <p>{`₹ ${product.productPrice}`}</p>
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
        <h1 className="option-h1">
          How often do you want to receive this item?
        </h1>
        <div className="options-btn">
          <button
            className="op-btn"
            onClick={() => handleFrequencyChange("custom")}
            style={{
              backgroundColor: frequency === "everyday" ? "#3d8e41" : "#dbeac5",
              color: frequency === "everyday" ? "#ffff" : "#3d8e41",
            }}
          >
            Custom
          </button>
          {/* <button className="op-btn" onClick={() => handleFrequencyChange("custom")}
            style={{
              backgroundColor: frequency === "custom" ? "#3d8e41" : "#dbeac5",
              color: frequency === "custom" ? "#ffff" : "#3d8e41",
            }}
            >
            Custom
          </button> */}
        </div>
        {frequency === "custom" && (
          <div style={styles.card}>
            <h2 style={styles.title}>Select Dates</h2>

            {/* Mode Toggle */}
            <div style={styles.toggle}>
              <label>
                <input
                  type="checkbox"
                  checked={isRangeMode}
                  onChange={() => {
                    setIsRangeMode(!isRangeMode);
                    setSelectedDates([]); // Reset selection on mode change
                  }}
                />
                Enable Date Range Selection
              </label>
            </div>

            {/* Calendar */}
            <DatePicker
              onChange={handleDateChange}
              multiple={!isRangeMode}
              range={isRangeMode}
              format="DD/MM/YYYY"
              placeholder="Select Dates"
              style={styles.datePicker}
            />

            {/* Display Selected Dates */}
            {selectedDates.length > 0 && (
              <div
                className="selected-dates"
                style={styles.selectedDatesContainer}
              >
                <p style={styles.heading}>Selected Dates:</p>
                {selectedDates.map(({ date, quantity,price }) => (
                  <div key={date} style={styles.selectedDateItem}>
                    <span style={styles.dateText}>
                      {date} ({getDayName(date)})
                    </span>
                    <div style={styles.quantityContainer}>
                      <AiOutlineMinus
                        className="quantity-incr"
                        style={styles.icon}
                        onClick={() => updateQuantity(date, -1)}
                      />
                      <span style={styles.quantityText}>{quantity}</span>
                      <AiOutlinePlus
                        className="quantity-incr"
                        style={styles.icon}
                        onClick={() => updateQuantity(date, 1)}
                      />
                    </div>
                    <div>Price: {price}</div>
                    <IoMdClose
                      style={styles.removeIcon}
                      onClick={() => handleRemoveDate(date)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "40px",
          }}
        >
          {" "}
          <button className="cart-btn" onClick={goToCheckout}>
            Proceed to checkout
          </button>
        </div>

        {/* {frequency === "custom" && (
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
        )} */}
      </div>
    </div>
  );
};

const SubscriptionProductPage = () => {
    const {currentUser} = useAuth();
  const [subscriptionProduct,setSubscriptionProduct] = useState([]);

  useEffect(()=>{
      const fetchSubscriptionProducts = async ()=>{
        console.log(currentUser?.data.data._id)
        console.log(currentUser)
             const subProducts = await getSubscriptionProducts(currentUser?.data.data._id);
             if(subProducts) setSubscriptionProduct(subProducts.subscriptionProducts)
             console.log(subProducts);
             console.log(subscriptionProduct);
       }
       fetchSubscriptionProducts();
   },[currentUser])
console.log(subscriptionProduct)
   const totalPrice = subscriptionProduct?.productQuantity?.reduce(
    (sum, { quantity, price }) => {
      return sum + price; // Ensure you return the updated sum
    },
    0 // Initial value of sum
  );

  return (
    <div className="subs-product-page-main">
    {  !subscriptionProduct?<div>
        <p style={{ color: "Red", fontSize: "18px", fontWeight: "600" }}>
          You have not subscribed any product.
        </p>
        <Link to={"/.product-append"}>
          <button className="sub-btn">Click here to subscribe product</button>
        </Link>
      </div>:
        <div>
          {subscriptionProduct.map((product, index) => (
            <div className="product">
              <div className="product-image">
                <img src={product.productImage} alt="Apple" />
              </div>
              <p className="productname-size">{product.productName}</p>
              <p className="productname-size">
                 {`You have subscribed this product for ${product.productQuantity.length} days.`}

              </p>
             <p>
              {totalPrice}
             </p>
            </div>
          ))}
          </div>
      }
    </div>
  );
};

const styles = {
  card: {
    maxWidth: "400px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    backgroundColor: "#fff",
  },
  title: {
    marginBottom: "15px",
    fontSize: "18px",
  },
  toggle: {
    marginBottom: "15px",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  datePicker: {
    marginBottom: "20px",
  },
  selectedDatesContainer: {
    marginTop: "15px",
    textAlign: "left",
  },
  heading: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  selectedDateItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    border: "1px solid #ccc",
    marginBottom: "5px",
  },
  dateText: {
    width: "45%",
  },
  quantityContainer: {
    width: "25%",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    cursor: "pointer",
    fontSize: "18px",
  },
  quantityText: {
    margin: "0 10px",
    fontWeight: "bold",
  },
  removeIcon: {
    cursor: "pointer",
    color: "red",
    fontSize: "18px",
  },
};
export { Subscription, SubscriptionProductPage };
