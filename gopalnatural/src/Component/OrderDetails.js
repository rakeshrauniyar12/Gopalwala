import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchOrdersByUserAndOrderId } from "../backend";
import { useAuth } from "./AuthProvider";
import "../Style/OrderDetails.css"
const OrderDetails = () => {
  const { userId, orderId } = useParams();
  const isMobile = window.innerWidth <= 768;
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();


  useEffect(() => {
    // Only proceed if currentUser is available
    if (!currentUser) return;

    const fetchOrderDetails = async () => {
      if (!userId || !orderId) {
        return;
      }

      try {
        const data = await fetchOrdersByUserAndOrderId(userId, orderId);
        setOrder(data.order || {});
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [currentUser, userId, orderId]); // Add currentUser to dependencies to trigger fetch when it changes

  // If loading, show a loading spinner
  if (loading) {
    return (
      <div className="spinner-container">
        <p>Loading...</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  const totalProductPrice = order.items.reduce(
    (total, product) => {
      return total + (Number(product.productPrice) * Number(product.quantity));
    },
    0
  );

  // SGST and CGST calculations
  const tax = totalProductPrice * 0.06;
  const totalPriceWithTax = totalProductPrice + 2 * tax;
 
  return (
    <div className="pOrder-details-main">
      {order ? (
        <>
          <h1
            style={{ fontWeight: "lighter",marginTop:"20px", marginBottom: "15px" }}
            className="pOrder-f"
          >
            View order details
          </h1>
          <div className="pOrder-details-main-first">
            {isMobile ? (
              <div className="pOrder-first-first">
                <div>
                  <p>Order date</p>
                  <p>{formatDate(order.createdAt)}</p>
                </div>
                <div>
                  <p>Order #</p>
                  <p>{orderId}</p>
                </div>
              </div>
            ) : (
              <div className="porder-firstchild">
                <p>
                  Ordered date {formatDate(order.createdAt)}
                  <span className="span2"></span>
                </p>
                <p>OrderId# {orderId}</p>
              </div>
            )}
          </div>
          <div className="pOrder-details-main-section">
            <div className="pfirst-section">
              <h2 className="ph2">Shipping Address</h2>
              <p className="nBorder">{order.addressId?.flatNumber},{order.addressId?.towerNumber},{order.addressId?.firstName},{order.addressId?.lastName},{order.addressId?.phoneNumber}</p>
            </div>
            <div className="psecond-section">
              <h2 className="ph2">Payment Methods</h2>
              <p className="nBorder">{order.paymentMethod}</p>
            </div>
            <div className="pthird-section">
              <h2 className="ph2">Order Summary</h2>
              <div className="u2">
                <div>
                  <p>Subtotal</p>
                  <p>{totalProductPrice.toFixed(2)}</p>
                </div>
                <div>
                  <p>SGST 6%</p>
                  <p>{tax.toFixed(2)}</p>
                </div>
                <div>
                  <p>CGST 6%</p>
                  <p>{tax.toFixed(2)}</p>
                </div>
                <div className="total-price">
                  <h3>Total:</h3>
                  <p>{totalPriceWithTax.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "10vh",
            color: "red",
          }}
        >
          Order details not available!
        </h2>
      )}
    </div>
  );
};

export { OrderDetails };
