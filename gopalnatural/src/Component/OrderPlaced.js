import React from "react";
import { TiTick } from "react-icons/ti";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "../Style/OrderPlaced.css"
const OrderPlaced= ()=>{
    const location = useLocation();
    const {addressString} = location.state || {};
    return(
        <div className="orderPlaced-main-section">
            <div className="orderPlaced-first-section">
                <div className="orderPlaced-first-section-first">
                    <TiTick style={{color:"#3d8e41"}}/>
                    <h1 style={{fontWeight:"bolder",fontSize:"18px",color:"#06a44b"}}>
                        Order placed, thank you!
                    </h1>
                </div>
             <p>Confirmation mail will be sent to your mail.</p>
             <h3>Shipping Address:</h3>
             <p>{addressString}</p>
            </div>
            <div className="orderPlaced-border"></div>
            <Link to={"/"} style={{color:"green"}}>{"Continue Shopping >"}</Link>
        </div>
    )
}

export default OrderPlaced;