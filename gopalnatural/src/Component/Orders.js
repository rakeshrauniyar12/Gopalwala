import React, { useEffect, useState } from "react";
import {
  fetchOrders,
  fetchOrdersByUserAndOrderId,
  fetchOrdersByUserOrderAndProductId,
  getUser,
} from "../backend";
import { useAuth } from "./AuthProvider";
import "../Style/Order.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const Orders = () => {
  const [order, setOrders] = useState([]);
  const [selectedOption, setSelectedOption] = useState("order"); // Track selected option
  const { currentUser } = useAuth();
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    const getOrder = async () => {
      const orders = await fetchOrders(currentUser?.data.data._id);
      console.log("Order Page", orders);
      setOrders(orders);
    };
    getOrder();
  }, [currentUser]);

  const extractDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const renderComponent = () => {
    switch (selectedOption) {
      case "order":
        return <OrderContent />;
      case "cancel":
        return <p>Cancel Order Component</p>;
      case "return":
        return <p>Return Order Component</p>;
      default:
        return null;
    }
  };

  return (
    <div style={{ marginBottom: "60px" }}>
      <div className="option-selector">
        <button
          style={{
            borderBottom: selectedOption === "order" ? "2px solid #b44700" : "",
          }}
          onClick={() => handleOptionChange("order")}
        >
          Order
        </button>
        <button
          style={{
            borderBottom:
              selectedOption === "cancel" ? "2px solid #b44700" : "",
          }}
          onClick={() => handleOptionChange("cancel")}
        >
          Cancel
        </button>
        <button
          style={{
            borderBottom:
              selectedOption === "return" ? "2px solid #b44700" : "",
          }}
          onClick={() => handleOptionChange("return")}
        >
          Return
        </button>
      </div>
      {renderComponent()}
    </div>
  );
};

const OrderContent = () => {
  const [loading, setLoading] = useState(true);
  const [order, setOrders] = useState([]);
  const [selectedOption, setSelectedOption] = useState("order"); // Track selected option
  const { currentUser } = useAuth();
  
  const isMobile = window.innerWidth <= 768;
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOrdersForUser = async () => {
        if (currentUser) {
            setLoading(true);
            try {
                const orders = await fetchOrders(currentUser.data.data._id); // Replace with your API call
                setOrders(orders||[]);
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    fetchOrdersForUser();
}, [currentUser]);
 
  const goToShowOrderDetails= (orderId,productId)=>{
      navigate(`/orders/showorderdetails/${orderId}/${productId}`)
  }

  const extractDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };
console.log((Array.isArray(order)).length)
  return (
    <>
      {loading ? (
        <div className="spinner-container">
          <ClipLoader color={"#36D7B7"} loading={loading} size={50} />
        </div>
      ) : (Array.isArray(order) && order.length === 0) ? (
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "40vh",
            color: "rgb(225, 0, 0)",
          }}
        >
          You have no orders.
        </h2>
      ) : (
        <div className="iOrder-detail-main">
          {order?.map((order) => (
            <div key={order._id}>
              <div className="iOrder-first-sec">
                <div className="iOrder-first-sec-first">
                  <div>
                    <p>Order Placed</p>
                    <p>{extractDate(order.createdAt)}</p>
                  </div>
                  <div>
                    <p>Total</p>
                    <p>{order.totalPrice}</p>
                  </div>
                  <div>
                    <p>Ship To</p>
                    <p>{order.addressId ? order.addressId.firstName : ""}</p>
                  </div>
                  {order.status !== "delivered" ? (
                    <div>
                      <p>Tracking ID</p>
                      <p>{order.trackingId}</p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="iOrder-first-sec-sec">
                  <div style={{ width: "110%" }}>
                    <p>Order # {order._id}</p>
                    <div
                      style={{
                        width: "90%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Link
                        to={`/orders/orderdetails/${currentUser.data.data._id}/${order._id}`}
                      >
                        <p>
                          View order details
                          {/* <span
                                style={{
                                  borderLeft: "2px solid black",
                                  marginRight: "4px",
                                  marginLeft: "4px",
                                }}
                              ></span> */}
                        </p>
                      </Link>
                      {/* <p style={{ cursor: "pointer" }}>Invoice</p> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="iOrder-details-sec-sec">
                <h1 className="iOrder-t-h1">{order.status}</h1>
              </div>
              <div>
                {order.items.map((item, index) =>
                  isMobile ? (
                    <div
                      className="iOrder-details-sec-third"
                      style={{ width: "100%" }}
                    >
                      <div className="iOrder-details-sec-third-first">
                        <img src={item.productImage} alt="main" />
                      </div>
                      <div className="iOrder-details-sec-third-second">
                        <p className="iOrder-details-p1">{item.productName}</p>
                        <p className="iOrder-details-p">{item.productName}</p>
                        <p className="iOrder-details-p5">{order.status}</p>
                        <div style={{ width: "130%", display: "flex" }}>
                          <button className="iOrder-b" onClick={()=>{goToShowOrderDetails(order._id,item.productId)}}>View details</button>

                          <button className="iOrder-b3">
                            Cancel this item
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="iOrder-details-sec-third">
                      <div className="iOrder-details-sec-third-first">
                        <img src={item.productImage} alt="main" />
                      </div>
                      <div className="iOrder-details-sec-third-second">
                        <p className="iOrder-details-p1">{item.productName}</p>
                        <p className="iOrder-details-p">{item.productName}</p>
                        <p className="iOrder-details-p5">{order.status}</p>
                        <div className="iOrder-pp">
                          <p>Price: {item.productPrice}</p>
                        </div>
                        <div className="iOrder-pp">
                          <p>Quantity: {item.quantity}</p>
                        </div>
                        <div className="bOrder-button">
                          <button className="iOrder-b1">
                            Return this item
                          </button>

                          {order.status !== "delivered" ? (
                            <button className="iOrder-b2">
                              Cancel this item
                            </button>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="iOrder-details-sec-third-third">
                        {order.status === "delivered" ? (
                          <button className="iOrder-b1">View items</button>
                        ) : (
                          ""
                        )}
                        <button className="iOrder-b2">
                          Get product support
                        </button>
                        <button className="iOrder-b1">
                          Write product review
                        </button>
                        {order.status !== "delivered" ? (
                          <button className="iOrder-b1">
                            Track your order
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const ShowOrderDetails = () => {
  const { orderId, productId } = useParams();
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (currentUser) {
          const ordersData = await fetchOrdersByUserOrderAndProductId(
            currentUser.data.data._id,
            orderId,
            productId
          );
          if (ordersData) {
            setOrders(ordersData);
          }
        }
      } catch (error) {
        throw error;
      }
    };
    fetchOrders();
  }, [currentUser,orderId, productId]);

  // const handleReturnReasonChange = (event) => {
  //   setReturnSelectedReason(event.target.value);
  // };

  // const handleReturnClosePopup = () => {
  //   setReturnShowPopup(false);
  // };

  // const handleReturnButtonClick = (orderId, productId) => {
  //   setReturnCurrentOrder(orderId);
  //   setReturnCurrentProduct(productId);
  //   setReturnShowPopup(true);
  // };

  // // const handleReturnOrder = async (orderId, productId, reason, user) => {
  // //   try {
  // //     const order = activeOrders.find((o) => o.$id === orderId);
  // //     let newReturnAmount = order.returnAmount;
  // //     let newOrderAmount = order.orderAmount;
  // //     const updatedProducts = order.products.map((product) => {
  // //       product = JSON.parse(product);
  // //       if (product.productId === productId) {
  // //         product.isReturn = true;
  // //         newOrderAmount -= product.productPrice;
  // //         newReturnAmount += product.productPrice; // Subtract the price of the canceled product
  // //         return JSON.stringify(product);
  // //       } else {
  // //         return JSON.stringify(product);
  // //       }
  // //     });
  // //     await services.updateOrder(orderId, {
  // //       products: updatedProducts,
  // //       orderAmount: newOrderAmount,
  // //       returnAmount: newReturnAmount,
  // //     });
  // //     handleReturnProduct(orderId, productId);
  // //     navigate("/orders");
  // //   } catch (error) {
  // //     throw error;
  // //   }
  // // };

  // const trackYourOrder = (orderId, trackingId) => {
  //   toast.warn("This will updated soon!");
  // };

  // const isReturnButtonVisible = (order) => {
  //   const date = new Date(order.$createdAt);
  //   date.setDate(date.getDate() + 14);
  //   const currentDate = new Date();
  //   const timeDiff = date.getTime() - currentDate.getTime();
  //   const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  //   return daysDiff <= 14;
  // };

  // const handleReturnSubmit = () => {
  //   handleReturnOrder(
  //     currentReturnOrder,
  //     currentReturnProduct,
  //     selectedReturnReason,
  //     user,
  //     activeOrders
  //   );
  //   setReturnShowPopup(false);
  // };

  const navigate = useNavigate();
  // if (loading) {
  //   return loading ? <LoadingOverlay visible={loading} /> : setActive(true);
  // }

  const viewItems = (category, productId) => {
    navigate(`/${category}/${productId}`);
  };
  const writeProductReview = (productId) => {
    navigate(`/createreview/${productId}`);
  };
  const goContact = () => {
    navigate("/contactus");
  };

  // const handleInvoiceClick = (order) => {
  //   generateInvoicePDF(user, order)
  //     .then((pdfBytes) => {
  //       const blob = new Blob([pdfBytes], { type: "application/pdf" });
  //       const link = document.createElement("a");
  //       link.href = window.URL.createObjectURL(blob);
  //       link.download = `${order.$id}.pdf`;
  //       link.click();
  //     })
  //     .catch((error) => {
  //       throw error;
  //     });
  // };

  // let product = order.products.filter((pro) => {
  //   pro = JSON.parse(pro);
  //   if (pro.productId === productId) {
  //     return pro;
  //   }
  // });
  // product = JSON.parse(product[0]);
  console.log("Inside Show Order",orders);
  return (
    <>
      {!orders ? (
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "10vh",
            color: "red",
          }}
        >
          order details not available!
        </h2>
      ) : (
        <div className="rOrder-details-main">
          <div className="rOrder-details-main-first">
            <img src={orders.product?.productImage} alt="Orders-Details" />
            <p>{orders.product?.productName}</p>
          </div>

          <div
            className="rOrder-details-main-sec"
            // onClick={() => viewItems(orders._id)}
          >
            <p>Buy it again</p>
            <p>{">"}</p>
          </div>
          <div className="dOrder-details-border"></div>
          <div className="rOrder-details-main-third">
            <h1 style={{ fontWeight: "bold", fontSize: "16px" }}>
              Need help with item?
            </h1>
            <div
            //  onClick={goContact}
             >
              <p>Get product support</p>
              <p>{">"}</p>
            </div>
          </div>
          <div className="dOrder-details-border"></div>
          <div className="rOrder-details-main-third">
            <h1 style={{ fontWeight: "bold", fontSize: "16px" }}>
              How's your item?
            </h1>
            <div 
            // onClick={() => writeProductReview(orders._id)}
            >
              <p>Write a product review</p>
              <p>{">"}</p>
            </div>
          </div>
          <div className="dOrder-details-border"></div>
          <div className="rOrder-details-main-third">
            <h1 style={{ fontWeight: "bold", fontSize: "16px" }}>Order info</h1>
            <Link to={`/orders/orderdetails/${currentUser.data.data._id}/${orderId}`}>
              <div className="mobRorder">
                <p>View order details</p>
                <p>{">"}</p>
              </div>
            </Link>
            <div
              style={{ cursor: "pointer" }}
              // onClick={() => {
              //   handleInvoiceClick(order);
              // }}
            >
              <p>Download Invoice</p>
              <p>{">"}</p>
            </div>
            {orders.status !== "delivered" && (
              <>
                <div
                  // onClick={() => {
                  //   trackYourOrder(orderId, order.trackingId);
                  // }}
                  style={{ cursor: "pointer" }}
                >
                  <p>Track your order</p>
                  <p>{">"}</p>
                </div>
                <div>
                  <p>Tracking ID</p>
                  <p>{orders.trackingId}</p>
                </div>
              </>
            )}
            {/* {isReturnButtonVisible(order) && (
              <div
                onClick={() => {
                  handleReturnButtonClick(orderId, productId);
                }}
                style={{ cursor: "pointer" }}
              >
                <p>Return this item</p>
                <p>{">"}</p>
              </div>
            )} */}
          </div>
          <div className="dOrder-details-border"></div>
        </div>
      )}
      {/* {showReturnPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Why do you want to return this order?</h3>
            <select
              value={selectedReturnReason}
              onChange={handleReturnReasonChange}
            >
              <option value="">Select return reason</option>
              <option value="mistake">Order created by mistake</option>
              <option value="time">Items would not arrive on time</option>
              <option value="price">Item price too high</option>
              <option value="cheaper">Found cheaper somewhere else</option>
              <option value="shipping">Need to change shipping address</option>
              <option value="payment">Need to change payment method</option>
            </select>
            <button onClick={handleReturnSubmit} className="pop-btn">
              Submit
            </button>
            <button onClick={handleReturnClosePopup} className="pop-btn">
              Close
            </button>
          </div>
        </div>
      )} */}
    </>
  );
};

const useOrderDetails = (userId, orderId) => {
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId || !userId) {
        console.error("Missing userId or orderId");
        setLoading(false); // Stop loading if inputs are invalid
        return;
      }

      try {
        const orderData = await fetchOrdersByUserAndOrderId(userId, orderId);
        console.log("Fetched Order Details:", orderData);
        if (orderData) {
          setOrder(orderData.order); // Properly update the order state
        } else {
          setError("No such document!");
        }
      } catch (err) {
        setError("Error fetching order details: " + err.message);
      } finally {
        setLoading(false); // Ensure loading is set to false
      }
    };

    fetchOrderDetails(); // Call the function when the dependency changes
  }, [userId, orderId]); // Dependencies: triggers fetch when userId or orderId changes

  console.log("Use Order Details Hook:", { order, loading, error });
  return { order, loading, error };
};

export { Orders, ShowOrderDetails };
