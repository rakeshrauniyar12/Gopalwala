import React, { useState, useEffect } from "react";
import "../Style/Navbar.css";
import { IoSearch } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import wish from "../Assets/Navbar/wish.png";
import cart_icon from "../Assets/Navbar/cart-icon.png";
import fruit1 from "../Assets/Home/fruits.png";
import vegetable from "../Assets/Home/vegetable.png";
import milk from "../Assets/Home/milk.png";
import meat from "../Assets/Home/meat.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import { getAllCartProduct } from "../backend";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthProvider";
import logo from "../Assets/Navbar/logo.png"
const Navbar = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [showCategories1, setShowCategories1] = useState(false);
  const [showCategories11, setShowCategories11] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { cartProducts, updateCart } = useCart();
  const { isLoggedIn, logout } = useAuth();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllCartProduct();
        updateCart(response); // Update context with fetched products
      } catch (error) {
        console.error("Failed to fetch cart products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Update isMobile state on window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMenuToggle = () => {
    setShowHamburger((prev) => !prev); // Toggle the state
  };

  const handleCategories = () => {
    setShowCategories(!showCategories);
  };

  const handleCategories1 = () => {
    setShowCategories1(!showCategories1);
  };

  const handleCategories2 = () => {
    setShowCategories11(!showCategories11);
  };

  return (
    <div className="navbar-container">
      {!isMobile ? (
        <>
          <div className="navbar-main">
            <div className="logo-div">
              <img src={logo}/>
            </div>
            <div className="option-div">
              <div className="option-div-1">
                <input placeholder="Search here" className="option-div-input" />
              </div>
              <div className="option-div-2">
                <div className="drop-down">
                  <p>All Category</p>
                  <RiArrowDropDownLine style={{ fontSize: "45px" }} />
                </div>
                <div className="io-search">
                  <IoSearch />
                </div>
              </div>
            </div>
            <div className="wish-cart-div">
              <div className="wish-cart-1">
                <div style={{ position: "relative" }}>
                  <div className="cart-icon-div">
                    <img src={wish} />
                  </div>
                  <p className="cart-zero">0</p>
                </div>
                <div>
                  <p>Favourite</p>
                </div>
              </div>
              <Link to={"/cart"} className="cart-link1">
                <div className="wish-cart-2">
                  <div style={{ position: "relative" }}>
                    <div className="cart-icon-div">
                      <img src={cart_icon} />
                    </div>
                    <p className="cart-zero">
                      {Array.isArray(cartProducts) ? cartProducts.length : 0}
                    </p>
                  </div>
                  <div>
                    <p>Cart</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="navbar-end">
            <div className="navbar-end-content">
              <div className="first-drop-arrow">
                <div>
                  <p>Browse By Categories</p>
                </div>
                <RiArrowDropDownLine
                  style={{ fontSize: "30px", color: "black" }}
                  onClick={handleCategories}
                />
              </div>
              <div className="second-div-content">
                <Link to={"/"} className="home-ppp">
                  <p>Home</p>
                </Link>
                <div className="second-drop-arrow">
                  <p>Shop</p>
                  <RiArrowDropDownLine
                    style={{ fontSize: "30px", color: "#ffff" }}
                    onClick={handleCategories1}
                  />
                </div>
                <p>About us</p>
                <p>Blog</p>
                <Link className="link-nav-btn" to={"/subscription"}>
                  <p>Subscription</p>
                </Link>
                <p>Contact us</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="navbar-main">
         
            <div className="navbar-mobile">
            <div className="logo-div">
              <img src={logo}/>
            </div>
              <div className="wish-cart-div">
                <div className="wish-cart-1">
                  <div style={{ position: "relative" }}>
                    <div className="cart-icon-div">
                      <img src={wish} />
                    </div>
                    <p className="cart-zero">0</p>
                  </div>
                  <div>
                    <p>Favourite</p>
                  </div>
                </div>
                <Link to={"/cart"} className="cart-link1">
                  <div className="wish-cart-2">
                    <div style={{ position: "relative" }}>
                      <div className="cart-icon-div">
                        <img src={cart_icon} height={15} />
                      </div>
                      <p className="cart-zero">
                        {Array.isArray(cartProducts) ? cartProducts.length : 0}
                      </p>
                    </div>
                    <div>
                      <p>Cart</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="option-div">
              <div className="option-div-1">
                <input placeholder="Search here" className="option-div-input" />
              </div>
              <div className="option-div-2">
                <div className="drop-down">
                  <p style={{ fontSize: "13px" }}>All Category</p>
                  <RiArrowDropDownLine style={{ fontSize: "35px" }} />
                </div>
                <div className="io-search">
                  <IoSearch />
                </div>
              </div>
            </div>
          </div>
          <div className="navbar-end">
            <div className="navbar-end-content">
              <div>
                <GiHamburgerMenu
                  onClick={handleMenuToggle}
                  style={{ color: "#ffff", fontSize: "30px" }}
                />
              </div>
              <div className="first-drop-arrow">
                <div>
                  <p>Browse By Categories</p>
                </div>
                <RiArrowDropDownLine
                  style={{ fontSize: "30px", color: "black" }}
                  onClick={handleCategories}
                />
              </div>
            </div>
          </div>
        </>
      )}

      {showHamburger && (
        <div className="second-div-content1">
          <MdClose
            onClick={handleMenuToggle}
            style={{ color: "black", fontSize: "35px",margin:"10px 20px" }}
          />
          <Link to={"/"} className="cart-link" onClick={handleMenuToggle}>
            <p>Home</p>
          </Link>
          <div className="second-drop-arrow">
            <p>Shop</p>
            <RiArrowDropDownLine
              style={{ fontSize: "30px", color: "black" }}
              onClick={handleCategories2}
            />
          </div>
          {showCategories11 && (
            <div className="show-categories111">
              <div className="show-categories1">
                <div className="cate-img">
                  <img src={fruit1} />
                </div>
                <p className="categ-p">Fresh Fruits</p>
              </div>
              <div className="show-categories1">
                <div className="cate-img">
                  <img src={vegetable} />
                </div>
                <p className="categ-p">Fresh Vegetables</p>
              </div>
              <div className="show-categories1">
                <div className="cate-img">
                  <img src={milk} />
                </div>
                <p className="categ-p">Fresh Milk and Dairy</p>
              </div>
              <div className="show-categories1">
                <div className="cate-img">
                  <img src={meat} />
                </div>
                <p className="categ-p">Fresh Meats</p>
              </div>
            </div>
          )}
          <Link className="cart-link">
            <p>About us</p>
          </Link>
          <Link className="cart-link">
            <p>Blog</p>
          </Link>
          <Link
            className="cart-link"
            to={"/subscription"}
            onClick={handleMenuToggle}
          >
            <p>Subscription</p>
          </Link>
          <Link className="cart-link">
            <p>Contact us</p>
          </Link>
         {isLoggedIn? <button onClick={()=>{
          logout()
          handleMenuToggle()}} className="header-logout-btn">
            Logout
          </button>:""}
        </div>
      )}
      {showCategories && (
        <div className="show-categories">
          <div className="show-categories1">
            <div className="cate-img">
              <img src={fruit1} />
            </div>
            <p className="categ-p">Fresh Fruits</p>
          </div>
          <div className="show-categories1">
            <div className="cate-img">
              <img src={vegetable} />
            </div>
            <p className="categ-p">Fresh Vegetables</p>
          </div>
          <div className="show-categories1">
            <div className="cate-img">
              <img src={milk} />
            </div>
            <p className="categ-p">Fresh Milk and Dairy</p>
          </div>
          <div className="show-categories1">
            <div className="cate-img">
              <img src={meat} />
            </div>
            <p className="categ-p">Fresh Meats</p>
          </div>
        </div>
      )}
      {showCategories1 && (
        <div className="show-categories144">
          <div className="show-categories1">
            <div className="cate-img">
              <img src={fruit1} />
            </div>
            <p className="categ-p">Fresh Fruits</p>
          </div>
          <div className="show-categories1">
            <div className="cate-img">
              <img src={vegetable} />
            </div>
            <p className="categ-p">Fresh Vegetables</p>
          </div>
          <div className="show-categories1">
            <div className="cate-img">
              <img src={milk} />
            </div>
            <p className="categ-p">Fresh Milk and Dairy</p>
          </div>
          <div className="show-categories1">
            <div className="cate-img">
              <img src={meat} />
            </div>
            <p className="categ-p">Fresh Meats</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
