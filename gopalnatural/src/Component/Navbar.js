import React from "react";
import "../Style/Navbar.css"
import { IoSearch } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import wish from "../Assets/Navbar/wish.png"
import cart_icon from "../Assets/Navbar/cart-icon.png"


const Navbar = ()=>{
    return(
        <div className="navbar-container">
              <div className="navbar-main">
                <div className="logo-div">Logo</div>
                <div className="option-div">
                  <div className="option-div-1"><input placeholder="Search here" className="option-div-input"/></div>
                  <div className="option-div-2">
                    <div className="drop-down">
                        <p>All Category</p>
                        <RiArrowDropDownLine style={{fontSize:"45px"}}/>
                    </div>
                    <div className="io-search"><IoSearch/></div>
                  </div>
                </div>
                <div className="wish-cart-div">
                    <div className="wish-cart-1">
                       <div style={{position:"relative"}}> 
                        <div className="cart-icon-div"><img src={wish}/></div>
                        <p className="cart-zero">0</p>
                        </div>
                        <div><p>Wishlist</p></div>
                    </div>
                    <div className="wish-cart-2">
                    <div style={{position:"relative"}}> 
                        <div className="cart-icon-div"><img src={cart_icon}/></div>
                        <p className="cart-zero">0</p>
                        </div>
                        <div><p>Cart</p></div> 
                    </div>
                </div>
              </div>
              <div className="navbar-end">
                    <div className="navbar-end-content">
                        <div className="first-drop-arrow">
                            <div><p>Browse By Categories</p></div>
                            <RiArrowDropDownLine style={{fontSize:"30px",color:"black"}}/>
                        </div>
                        <div className="second-div-content">
                            <p>Home</p>
                            <div className="second-drop-arrow"><p>Shop</p><RiArrowDropDownLine style={{fontSize:"30px",color:"#ffff"}}/></div>
                            <p>About us</p>
                            <p>Blog</p>
                            <p>Contact us</p>
                        </div>
                        </div> 
              </div>
        </div>
    )
}

export default Navbar;