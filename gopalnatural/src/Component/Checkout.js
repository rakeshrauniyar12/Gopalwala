import React,{useState} from "react";
import "../Style/Checkout.css"
import {Link} from "react-router-dom";
import upi from "../Assets/Checkout/upi.png"
import master_card from "../Assets/Checkout/master_card.png"
import google_pay from "../Assets/Checkout/google_pay.png"
import paytm from "../Assets/Checkout/paytm.png"
import phone_pe from "../Assets/Checkout/phone_pe.png"
import visa from "../Assets/Checkout/visa.png"
import { RiArrowDropDownLine } from "react-icons/ri";
const Checkout = ()=>{
    const [showSociety,setShowSociety] = useState(false);
    const [isRotated, setIsRotated] = useState(false);

    const handleRotate = () => {
      setIsRotated((prev) => !prev);
    };
    const handleShowSociety = ()=>{
        setShowSociety(!showSociety);
        console.log("hello")
    }
    return(
        <div className="checkout-main-container">
              <div><h1 className="checkout-h1">Shipping Information</h1></div>
              <div><p className="checkout-p">Already have an account? <Link to={"/login"} className="checkout-link">Login</Link></p></div>

              <div className="checkout-input">
                <div><input placeholder="Enter First Name"/></div>
                <div><input placeholder="Enter Last Name"/></div>
                <div><input placeholder="Enter Phone No"/></div>
                <div><input placeholder="Enter Mail ID"/></div>
                <div><input placeholder="Enter Country"/></div>
                <div><input placeholder="Enter State"/></div>
                <div><input placeholder="Enter Zip Code"/></div>
                <div><input placeholder="Enter City"/></div>
              </div>
              <div className="checkout-area">
               <textarea placeholder="Enter Address"/>
              </div>
              <div className="check-end">
              <div className="check-payment">
              <div><h1 className="checkout-h1">Society</h1></div>
              <div><p className="checkout-p">Select Your Society</p></div>
              <div className="select-society">
                <p>Select Your Society</p>
                <RiArrowDropDownLine
                 style={{
                    fontSize: "60px",
                    transform: isRotated ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                    cursor:"pointer"
                  }}
                  onClick={()=>{
                    handleRotate()
                    handleShowSociety()
                  }}
                 />
              </div>
             {showSociety && <div className="society-dropdown">
                <p>Tata Promont</p>
                <p>Sobha Neopolis</p>
                <p>Embassy Lake</p>
                <p>Felicity Engrace</p>
                <p>Sattva Aeropolis</p>
                <p>Suncity</p>
                <p>Grey Stone</p>
              </div>}
              </div>
             <div className="check-payment">
              <div><h1 className="checkout-h1">Payment Method</h1></div>
              <div><p className="checkout-p">Select Your Payment Method</p></div>
              <div className="checkout-select">
                <div>
                    <input type="radio"/>
                    <div><img src={google_pay}/></div>
                    <p>Google Pay</p>
                </div>
                <div>
                    <input type="radio"/>
                    <div><img src={phone_pe}/></div>
                    <p>Phone Pe</p>
                </div>
                <div>
                    <input type="radio"/>
                    <div><img src={upi}/></div>
                    <p>UPI</p>
                </div>
                <div>
                    <input type="radio"/>
                    <div><img src={paytm}/></div>
                    <p>Paytm</p>
                </div>
                <div>
                    <input type="radio"/>
                    <div><img src={visa}/></div>
                    <p>Visa</p>
                </div>
                <div>
                    <input type="radio"/>
                    <div><img src={master_card}/></div>
                    <p>Master Card</p>
                </div>
                <div>
                    <input type="radio"/>
                    <p>COD (Cash on Delivery)</p>
                </div>
              </div>
              <Link to={"/checkout"}><button className="cart-btn1">checkout</button></Link>
              </div>
              </div>
             
          </div>
    )
}


export default Checkout;