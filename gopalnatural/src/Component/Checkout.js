import React, { useEffect, useState } from "react";
import "../Style/Checkout.css";
import { Link } from "react-router-dom";
import upi from "../Assets/Checkout/upi.png";
import master_card from "../Assets/Checkout/master_card.png";
import google_pay from "../Assets/Checkout/google_pay.png";
import paytm from "../Assets/Checkout/paytm.png";
import phone_pe from "../Assets/Checkout/phone_pe.png";
import visa from "../Assets/Checkout/visa.png";
import { useAuth } from "./AuthProvider";
import { RiArrowDropDownLine } from "react-icons/ri";
import {
  getAddress,
  saveOrder,
  removeAddress,
  getAddressById,
  saveSubscriptionProduct,
  updateSocietyName
} from "../backend";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { AddAddressPage } from "./Address";
import CheckoutLoginPage from "./CheckoutLoginPage";
const Checkout = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = window.innerWidth <= 768;
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [societyName, setShowSocietyName] = useState("Select Society Name");
  const [showSociety, setShowSociety] = useState(false);
  const [isRotated, setIsRotated] = useState(false);
  const [errors, setErrors] = useState({});
  const { currentUser, isLoggedIn, login } = useAuth();
  const { totalPriceWithTax, products, finalObject, paths } =
    location.state || {};
 
  useEffect(() => {
    const fetchAddress = async () => {
      const fetchAddress = await getAddress(currentUser.data.data._id);
      setAddresses(fetchAddress.addresses);
      console.log(fetchAddress.addresses);
    };

    if (currentUser) {
      fetchAddress();
    }
  }, [currentUser, refreshKey]);
  const handleAddressChange = (addressId) => {
    setSelectedAddress(addressId);
  };
  const handleRotate = () => {
    setIsRotated((prev) => !prev);
  };

  const handleShowSociety = () => {
    setShowSociety((prev) => !prev);
  };

  const path = "/checkout";
  const handlePaymentChange = (paymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
  };
 console.log("Before Updation",refreshKey)
 const updateUserAfterSocietNameUpdate = ()=>{
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("userId");
            login(token,userId);
 }
  const handleUpdateSocietyName = async (userId,societyName)=>{
    if (societyName === "Select Society Name") {
      toast.warn("Please select a valid society name!");
      return;
    }
    try {
      await updateSocietyName(currentUser.data.data._id, societyName);
      toast.success("Society name updated successfully!");
      setRefreshKey((prev) => prev + 1);
      console.log("After Updation",refreshKey)
      updateUserAfterSocietNameUpdate();
    } catch (error) {
      toast.error("Error updating society name!");
      console.error("Update error:", error);
    }
   }
   console.log("Cuur",currentUser)
  const handlePlaceOrder = async () => {
    if (!isLoggedIn) {
      toast.warn("please fill shipping info..");
      return;
    }
   
    if (!selectedAddress) {
      toast.warn("Please select the address!");
      return;
    }
    if (!selectedPaymentMethod) {
      toast.warn("Please select the payment method!");
      return;
    }
    const userId = currentUser.data.data._id;
    let subscriptionId = null;
    const sendAddressToPlaced = await getAddressById(selectedAddress);
    const addressString = `${sendAddressToPlaced.firstName}, ${sendAddressToPlaced.lastName}, ${sendAddressToPlaced.phoneNumber}, ${currentUser.data.data.societyName}`;
    if (paths === "/subscription/:id") {
      const subscriptionResponse = await saveSubscriptionProduct(
        userId,
        finalObject.subscriptionData
      );
      console.log(subscriptionResponse);
      subscriptionId = subscriptionResponse.subscriptionProduct._id;
      const extractedProducts = [
        {
          productId: finalObject.subscriptionData.productId,
          productImage: finalObject.subscriptionData.productImage,
          productName: finalObject.subscriptionData.productName,
          productPrice: finalObject.subscriptionData.productPrice,
          productQuantity: 1,
        },
      ];
      const totalPrice = totalPriceWithTax;
      const paymentMethod = selectedPaymentMethod;
      const addressId = selectedAddress;
      console.log(subscriptionId);

      // productArray.push(exr)
      const orderData = {
        userId,
        addressId,
        paymentMethod,
        totalPrice,
        subscriptionId,
        extractedProducts,
      };
      try {
        const res = await saveOrder(orderData);
        console.log("Inside Checkout Order Details", res);
        if (res) {
          toast.success("order successfull");
          navigate("/orderplaced", { state: { addressString } });
        }
      } catch (error) {
        throw error;
      }
    } else {
      if (selectedAddress && selectedPaymentMethod) {
        const extractedProducts = products.map((product) => ({
          productId: product._id,
          productImage: product.productImage,
          productName: product.productName,
          productPrice: product.productPrice,
          productQuantity: product.productQuantity,
        }));
        const totalPrice = totalPriceWithTax;
        const paymentMethod = selectedPaymentMethod;
        const addressId = selectedAddress;
        // const userId = currentUser.data.data._id;
        const orderData = {
          userId,
          addressId,
          paymentMethod,
          totalPrice,
          subscriptionId,
          extractedProducts,
        };
        try {
          const res = await saveOrder(orderData);
          console.log("Inside Checkout Order Details", res);
          if (res) {
            toast.success("order successfull");
            navigate("/orderplaced", { state: { addressString } });
          }
        } catch (error) {
          throw error;
        }
      }
    }
  };
  const handleSocietySelect = (society) => {
    setShowSocietyName(society);
    setShowSociety(false);
    setIsRotated(false);
  };
  const handleRemoveAddress = async (addressId) => {
    console.log("RemoveAddInsideCheckout", addressId);
    try {
      const updatedAddresses = await removeAddress(
        currentUser.data.data._id,
        addressId
      );
      setAddresses(updatedAddresses.addresses || []);
      toast.success("Address removed successfully!", { autoClose: 1500 });
    } catch (error) {
      toast.error("Error removing address!", { autoClose: 1500 });
    }
  };
  return (
    <div className="checkout-main-container" key={refreshKey}>
      <div className="check-1">
        {!isLoggedIn ? (
          <CheckoutLoginPage
            onRefresh={() => {
              setRefreshKey(refreshKey + 1);
            }}
          />
        ) : (
          <>
            <div className="checkoutShippingAddressDiv">
              <h2 className="select-address-h1">Select a delivery address</h2>
              {addresses ? (
                addresses.length === 0 ? (
                  <CheckoutLoginPage
                    onRefresh={() => {
                      setRefreshKey(refreshKey + 1);
                      console.log("Trigger Refreshh!!");
                    }}
                  />
                ) : (
                  ""
                )
              ) : (
                ""
              )}
              {addresses.map((address, index) => (
                <>
                  {currentUser.data.data.societyName ===
                  "Select Society Name" ? (
                    <>
                      <div className="check-select-sco">
                        <div
                          className="select-society"
                          style={{
                            marginTop: "0px",
                            height: "46px",
                            width: "90%",
                          }}
                        >
                          <p>
                            {societyName
                              ? `${societyName}`
                              : "Select Your Society"}
                          </p>
                          <div
                            className="society-selection-box"
                            onClick={() => {
                              handleRotate();
                              handleShowSociety();
                            }}
                          >
                            <RiArrowDropDownLine
                              style={{
                                fontSize: "60px",
                                transform: isRotated
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                                transition: "transform 0.3s ease",
                                cursor: "pointer",
                              }}
                            />
                          </div>
                        </div>
                        <div className="check-ship-btn">
                          <button
                           onClick={()=>{
                            handleUpdateSocietyName(currentUser.data.data._id,societyName)
                           }}
                            // disabled={loading}
                            className="add-addres"
                          >
                         Add Shipping Info
                          </button>
                        </div>
                      </div>
                      {showSociety && (
                        <div
                          className="society-dropdown"
                          style={{
                            width: !isMobile ? "45%" : "75%",
                           
                          }}
                        >
                          {[
                            "Select Your Society",
                            "OUCOLONY",
                            "OUTEMPLE",
                            "WESTERN PLAZA",
                            "MANIKONDA",
                            "PUPPALAGUDA",
                            "KHAJAGUDA",
                            "AYYAPPA SOCIETY",
                            "KOKAPET",
                            "APARNA CYBERZON",
                            "APARNA CYBERLIFE",
                            "APARNA SAROVAR ZENITH",
                            "APARNA SERENE PARK",
                            "APARNA CYBERSCAPE",
                            "APARNA LUXOR PARK",
                            "APARNA KANOPY MARIGOLD",
                            "APARNA SERENITY",
                            "Tata Promont",
                            "Sobha Neopolis",
                            "Embassy Lake",
                            "Felicity Engrace",
                            "Sattva Aeropolis",
                            "Suncity",
                            "Grey Stone",
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
                    </>
                  ) : (
                    ""
                  )}
                  <div key={index} className="shippingaddress">
                    <input
                      type="radio"
                      name="address"
                      value={address._id}
                      checked={selectedAddress === address._id}
                      onChange={() => handleAddressChange(address._id)}
                    />
                    <p>{` ${address.flatNumber}, ${address.towerNumber},${currentUser.data.data.societyName},${address.firstName}, ${address.lastName}, ${address.phoneNumber} `}</p>{" "}
                  </div>
                  <div className="che-ship-btn">
                    <button
                      onClick={() => {
                        navigate(`/address/updateaddress/${address._id}`, {
                          state: { path, totalPriceWithTax, products },
                        });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        handleRemoveAddress(address._id);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </>
              ))}
              {/* <div className="add-sec-third">
                <button
                  className="iAdd-b1"
                  onClick={() => {
                    navigate("/address/checkoutloginpage", {
                      state: { path, totalPriceWithTax, products },
                    });
                  }}
                >
                  Add new address
                </button>
              </div> */}
            </div>
          </>
        )}
        <div className="check-end">
          <div className="check-payment">
            <div>
              <h1 className="checkout-h1">Payment Method</h1>
            </div>
            <div>
              <p className="checkout-p">Select Your Payment Method</p>
            </div>
            <div className="checkout-select">
              <div>
                <input
                  type="radio"
                  name="payment"
                  checked={selectedPaymentMethod === "google_pay"}
                  onChange={() => handlePaymentChange("google_pay")}
                />
                <div>
                  <img src={google_pay} />
                </div>
                <p>Google Pay</p>
              </div>
              <div>
                <input
                  type="radio"
                  name="payment"
                  checked={selectedPaymentMethod === "phone_pe"}
                  onChange={() => handlePaymentChange("phone_pe")}
                />
                <div>
                  <img src={phone_pe} />
                </div>
                <p>Phone Pe</p>
              </div>
              <div>
                <input
                  type="radio"
                  name="payment"
                  checked={selectedPaymentMethod === "upi"}
                  onChange={() => handlePaymentChange("upi")}
                />
                <div>
                  <img src={upi} />
                </div>
                <p>UPI</p>
              </div>
              <div>
                <input
                  type="radio"
                  name="payment"
                  checked={selectedPaymentMethod === "paytm"}
                  onChange={() => handlePaymentChange("paytm")}
                />
                <div>
                  <img src={paytm} />
                </div>
                <p>Paytm</p>
              </div>
              <div>
                <input
                  type="radio"
                  name="payment"
                  checked={selectedPaymentMethod === "visa"}
                  onChange={() => handlePaymentChange("visa")}
                />
                <div>
                  <img src={visa} />
                </div>
                <p>Visa</p>
              </div>
              <div>
                <input
                  type="radio"
                  name="payment"
                  checked={selectedPaymentMethod === "master_card"}
                  onChange={() => handlePaymentChange("master_card")}
                />
                <div>
                  <img src={master_card} />
                </div>
                <p>Master Card</p>
              </div>
              <div>
                <input
                  type="radio"
                  name="payment"
                  checked={selectedPaymentMethod === "cod"}
                  onChange={() => handlePaymentChange("cod")}
                />
                <p>COD (Cash on Delivery)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="checkoutRightMain">
        <h2>Order Summary</h2>
        <div>
          <p>Items:</p>
          <p>₹{totalPriceWithTax}</p>
        </div>
        <div>
          <p>Delivery:</p>
          <p>₹0.00</p>
        </div>
        <hr />
        <div className="orderTotalDiv">
          <h2>Order Total</h2>
          <h2>₹{totalPriceWithTax}</h2>
        </div>
        <button onClick={handlePlaceOrder}>Place your order</button>
        <p>
          By placing your order, you agree to gowwala's privacy notice and
          conditions of use.
        </p>
      </div>
    </div>
  );
};

export default Checkout;
