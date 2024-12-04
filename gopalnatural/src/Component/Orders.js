import React, { useEffect, useState } from "react";
import { fetchOrders } from "../backend";
import { useAuth } from "./AuthProvider";
import "../Style/Order.css";
import { Link } from "react-router-dom";

const Orders = () => {
  const [order, setOrders] = useState([]);
  const [selectedOption, setSelectedOption] = useState("order"); // Track selected option
  const { currentUser } = useAuth();
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    const getOrder = async () => {
      const orders = await fetchOrders(currentUser.data.data._id);
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
        return <OrderContent/>;
      case "cancel":
        return <p>Cancel Order Component</p>;
      case "return":
        return <p>Return Order Component</p>;
      default:
        return null;
    }
  };

  return (
    <div style={{marginBottom:"60px"}}>
    <div className="option-selector">
      <button style={{borderBottom: selectedOption==="order"?"2px solid #3d8e41":""}} onClick={() => handleOptionChange("order")}>Order</button>
      <button style={{borderBottom: selectedOption==="cancel"?"2px solid #3d8e41":""}} onClick={() => handleOptionChange("cancel")}>Cancel</button>
      <button style={{borderBottom: selectedOption==="return"?"2px solid #3d8e41":""}} onClick={() => handleOptionChange("return")}>Return</button>
    </div>
    {renderComponent()}
    </div>
  );
};


const OrderContent = ()=>{
    const [order, setOrders] = useState([]);
    const [selectedOption, setSelectedOption] = useState("order"); // Track selected option
    const { currentUser } = useAuth();
    const isMobile = window.innerWidth <= 768;
  
    useEffect(() => {
      const getOrder = async () => {
        const orders = await fetchOrders(currentUser.data.data._id);
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
  
    return(
        <>
        {order.length === 0 ? (
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
              {order.map((order) => (
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
                        <p>{order.addressId.firstName}</p>
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
                          <Link to={`/orders/orderdetails/${order._id}`}>
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
                              <button className="iOrder-b">View details</button>
      
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
    )
}

export { Orders };
