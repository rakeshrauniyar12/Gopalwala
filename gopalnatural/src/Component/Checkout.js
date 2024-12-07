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
import { getAddress,saveOrder,removeAddress, getAddressById } from "../backend";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { AddAddressPage } from "./Address";
const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const { currentUser, isLoggedIn } = useAuth();
  const { totalPriceWithTax, products } = location.state || {};
  

  useEffect(() => {
    const fetchAddress = async () => {
      const fetchAddress = await getAddress(currentUser.data.data._id);
      setAddresses(fetchAddress.addresses);
      console.log(fetchAddress.addresses);
    };

    if (currentUser) {
      fetchAddress();
    }
  }, [currentUser]);
  const handleAddressChange = (addressId) => {
    setSelectedAddress(addressId);
  };
const path = "/checkout"
  const handlePaymentChange = (paymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
  };
 
  const handlePlaceOrder = async () => {
    if(!isLoggedIn){
      toast.warn("Please login!")
      return;
    }
    if(!selectedAddress){
      toast.warn("Please select the address!")
      return;
    }
    if(!selectedPaymentMethod){
      toast.warn("Please select the payment method!")
      return;
    }
     const sendAddressToPlaced = await getAddressById(selectedAddress);
      const addressString = `${sendAddressToPlaced.firstName}, ${sendAddressToPlaced.lastName}, ${sendAddressToPlaced.phoneNumber}, ${currentUser.data.data.societyName}, ${sendAddressToPlaced.city}, ${sendAddressToPlaced.zipCode}, ${sendAddressToPlaced.state}`
    if (selectedAddress && selectedPaymentMethod) {
      const extractedProducts = products.map((product) => ({
        productId: product._id,
        productImage:product.productImage,
        productName:product.productName,
        productPrice:product.productPrice,
        productQuantity: product.productQuantity,
      }));
      const totalPrice=totalPriceWithTax;
      const paymentMethod=selectedPaymentMethod;
      const addressId= selectedAddress;
      const userId =  currentUser.data.data._id;
     const orderData= {
       userId,    
       addressId, 
        paymentMethod, 
        totalPrice,         
        extractedProducts
      }
   try {
        const res= await saveOrder(orderData);
        console.log("Inside Checkout Order Details",res);
        if(res){
          toast.success("order successfull")
          navigate("/orderplaced",{state:{addressString}});
        }
   } catch (error) {
      throw error;
   }

        
    } 
  };
  const handleRemoveAddress = async (addressId) => {
    console.log("RemoveAddInsideCheckout",addressId)
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
    <div className="checkout-main-container">
      <div className="check-1">
        {!isLoggedIn ? (
           <AddAddressPage/>
        ) : (
          <>
           
            <div className="checkoutShippingAddressDiv">
              <h2 className="select-address-h1">Select a delivery address</h2>
              {addresses?addresses.length===0?"No Address found":"":""}
              {addresses.map((address, index) => (
                <>
                <div key={index} className="shippingaddress">
                  <input
                    type="radio"
                    name="address"
                    value={address._id}
                    checked={selectedAddress === address._id}
                    onChange={() => handleAddressChange(address._id)}
                  />
                  <p>{`${address.firstName}, ${address.lastName}, ${address.phoneNumber}, ${address.city}, ${address.zipCode}, ${address.state}`}</p>
                </div>
                <div>
                  <button onClick={()=>{
                      navigate(`/address/updateaddress/${address._id}`,{ state:  {path,totalPriceWithTax,products}  })
                  }}>Edit</button>
                  <button onClick={()=>{handleRemoveAddress(address._id)}}>Remove</button>
                </div>
                </>
              ))}
              <div className="add-sec-third">
                  <button className="iAdd-b1" onClick={()=>{
                       navigate("/address/addaddress",{ state:  {path,totalPriceWithTax,products}  })
                  }}>Add new address</button>
              </div>
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
        <button
          onClick={handlePlaceOrder}
        >
          Place your order
        </button>
        <p>
          By placing your order, you agree to gowwala's privacy notice and
          conditions of use.
        </p>
      </div>
    </div>
  );
};

export default Checkout;
