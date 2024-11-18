import React, { useRef, useState } from "react";
import wish from "../Assets/Navbar/wish.png";
import { FaRegStar } from "react-icons/fa";
import meat from "../Assets/Home/meat.png";
import fruits from "../Assets/Home/fruits.png";
import milk from "../Assets/Home/milk.png";
import vegetables from "../Assets/Home/vegetable.png";
import chicken from "../Assets/Home/product/chicken.png";
import tomato from "../Assets/Home/product/tomato.png";
import orange from "../Assets/Home/product/orange.png";
import mutton from "../Assets/Home/product/mutton.png";
import milk1 from "../Assets/Home/product/milk.png";
import curd from "../Assets/Home/product/curd.png";
import apple from "../Assets/Home/product/apple.png";
import pr1 from "../Assets/Home/product/pr-1.png";
import pr2 from "../Assets/Home/product/pr-2.png";
import pr3 from "../Assets/Home/product/pr-3.png";
import "../Style/Home.css";
const Home = () => {
  return (
    <div className="home-container">
      <div className="header-section">
        <div className="header-content">
          <p className="header-p">Eat organic food to maintain your health.</p>
          <p className="repu-p">
            A reputable brand dedicated to providing organic food.
          </p>
          <button className="header-btn">Shop Now</button>
        </div>
      </div>

      <div className="choose-categories-1">
        <div className="choose-content">
          <div className="choose-heading">
            <h3>Choose your Categories</h3>
            <h2>Top Categories</h2>
          </div>
          <div className="choose-image">
            <div>
              <div>
                <img src={vegetables} />
              </div>
              <p>Vegetables</p>
            </div>
            <div>
              <div>
                <img src={fruits} />
              </div>
              <p>Fruits</p>
            </div>
            <div>
              <div>
                <img src={milk} />
              </div>
              <p>Milk and dairy</p>
            </div>
            <div>
              <div>
                <img src={meat} />
              </div>
              <p>Fresh meat</p>
            </div>
          </div>
        </div>
      </div>

      <div className="product-categories-1">
        <div className="choose-content">
          <div className="choose-heading">
            <h3>Genuine Organic Goods</h3>
            <h2>Trending Items</h2>
          </div>
          <div className="product-append">
            {/* first */}
            <div className="product">
              <div className="off-div">
                <p>5 % off</p>
              </div>
              <div className="product-image">
                <img src={apple} alt="Apple" />
              </div>
              <p className="productname-size">Apple</p>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
              >
                (1Kg)
              </p>
              <p className="productname-size">
                <span className="p-span">₹ 120</span>₹ 114
              </p>
              <div
                style={{
                  display: "flex",
                  columnGap: "3px",
                  fontSize: "10px",
                  marginTop: "5px",
                  marginBottom: "10px",
                }}
              >
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />
              </div>
              <div className="product-last-section">
                <button className="product-btn">Add to cart</button>
                <div className="cart-icon-div1">
                  <img src={wish} />
                </div>
              </div>
            </div>

            {/* second */}
            <div className="product">
              <div className="off-div">
                <p>5 % off</p>
              </div>
              <div className="product-image">
                <img src={chicken} alt="Apple" />
              </div>
              <p className="productname-size">Fresh Chicken Meat</p>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
              >
                (1Kg)
              </p>
              <p className="productname-size">
                <span className="p-span">₹ 120</span>₹ 114
              </p>
              <div
                style={{
                  display: "flex",
                  columnGap: "3px",
                  fontSize: "10px",
                  marginTop: "5px",
                  marginBottom: "10px",
                }}
              >
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />
              </div>
              <div className="product-last-section">
                <button className="product-btn">Add to cart</button>
                <div className="cart-icon-div1">
                  <img src={wish} />
                </div>
              </div>
            </div>

            {/* third */}
            <div className="product">
              <div className="off-div">
                <p>5 % off</p>
              </div>
              <div className="product-image">
                <img src={orange} alt="Apple" />
              </div>
              <p className="productname-size">Orange</p>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
              >
                (1Kg)
              </p>
              <p className="productname-size">
                <span className="p-span">₹ 120</span>₹ 114
              </p>
              <div
                style={{
                  display: "flex",
                  columnGap: "3px",
                  fontSize: "10px",
                  marginTop: "5px",
                  marginBottom: "10px",
                }}
              >
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />
              </div>
              <div className="product-last-section">
                <button className="product-btn">Add to cart</button>
                <div className="cart-icon-div1">
                  <img src={wish} />
                </div>
              </div>
            </div>

            {/* four */}

            <div className="product">
              <div className="off-div">
                <p>5 % off</p>
              </div>
              <div className="product-image">
                <img src={milk1} alt="Apple" />
              </div>
              <p className="productname-size">Fresh Milk</p>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
              >
                (1 ltr)
              </p>
              <p className="productname-size">
                <span className="p-span">₹ 120</span>₹ 114
              </p>
              <div
                style={{
                  display: "flex",
                  columnGap: "3px",
                  fontSize: "10px",
                  marginTop: "5px",
                  marginBottom: "10px",
                }}
              >
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />
              </div>
              <div className="product-last-section">
                <button className="product-btn">Add to cart</button>
                <div className="cart-icon-div1">
                  <img src={wish} />
                </div>
              </div>
            </div>

            {/* five */}
            <div className="product">
              <div className="off-div">
                <p>5 % off</p>
              </div>
              <div className="product-image">
                <img src={tomato} alt="Apple" />
              </div>
              <p className="productname-size">Tomato</p>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
              >
                (1Kg)
              </p>
              <p className="productname-size">
                <span className="p-span">₹ 120</span>₹ 114
              </p>
              <div
                style={{
                  display: "flex",
                  columnGap: "3px",
                  fontSize: "10px",
                  marginTop: "5px",
                  marginBottom: "10px",
                }}
              >
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />
              </div>
              <div className="product-last-section">
                <button className="product-btn">Add to cart</button>
                <div className="cart-icon-div1">
                  <img src={wish} />
                </div>
              </div>
            </div>

            {/* six */}
            <div className="product">
              <div className="off-div">
                <p>5 % off</p>
              </div>
              <div className="product-image">
                <img src={mutton} alt="Apple" />
              </div>
              <p className="productname-size">Fresh Mutton</p>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
              >
                (1Kg)
              </p>
              <p className="productname-size">
                <span className="p-span">₹ 120</span>₹ 114
              </p>
              <div
                style={{
                  display: "flex",
                  columnGap: "3px",
                  fontSize: "10px",
                  marginTop: "5px",
                  marginBottom: "10px",
                }}
              >
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />
              </div>
              <div className="product-last-section">
                <button className="product-btn">Add to cart</button>
                <div className="cart-icon-div1">
                  <img src={wish} />
                </div>
              </div>
            </div>

            {/* seven  */}
            <div className="product">
              <div className="off-div">
                <p>5 % off</p>
              </div>
              <div className="product-image">
                <img src={curd} alt="Apple" />
              </div>
              <p className="productname-size">Fresh Curd</p>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
              >
                (1Kg)
              </p>
              <p className="productname-size">
                <span className="p-span">₹ 120</span>₹ 114
              </p>
              <div
                style={{
                  display: "flex",
                  columnGap: "3px",
                  fontSize: "10px",
                  marginTop: "5px",
                  marginBottom: "10px",
                }}
              >
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />
              </div>
              <div className="product-last-section">
                <button className="product-btn">Add to cart</button>
                <div className="cart-icon-div1">
                  <img src={wish} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="product-categories-2">
        <div className="choose-content">
          <div className="choose-heading">
            <h3>Genuine Organic Goods</h3>
            <h2>Trending Items</h2>
          </div>
        </div>

        <div className="product-description">
            <div className="product-desc-1">
                <h3 style={{fontSize:"16px",fontWeight:"600"}}>Enjoy a 30% discount on fruit!
                </h3>
                <p className="descr-p">Offers fruit combo packs that are packed with fiber and include fruits like banana, kiwi, apple, and pear</p>
                <div className="img-btn">
                    <div className="img-btn1"><button className="header-btn1">Shop Now</button></div>
                    <div className="img-btn2"> <img src={pr2}/></div>
               
                   
                </div>
            </div>
            <div className="product-desc-2">
                <h3 style={{fontSize:"16px",fontWeight:"600"}}>Enjoy a 25% discount on fruit!
                </h3>
                <p className="descr-p">Green Brinjal Round, Coriander, Snake Gourd ; Green Brinjal Long, Drumstick, Radish White ; White Brinjal Round, Long Beans, Beetroot.</p>
                <div className="img-btn">
                    <div className="img-btn1"><button className="header-btn1">Shop Now</button></div>
                    <div className="img-btn2"> <img src={pr3}/></div>
               
                   
                </div>
            </div>
            <div className="product-desc-3">
                <h3 style={{fontSize:"16px",fontWeight:"600"}}>Enjoy a 30% discount on fruit!
                </h3>
                <p className="descr-p">Offers up to 30% off on meat orders, including chicken, pork, mutton, fish, and seafood. They also offer loyalty discounts and exclusive mutton offers.</p>
                <div className="img-btn">
                    <div className="img-btn1"><button className="header-btn1">Shop Now</button></div>
                    <div className="img-btn2"> <img src={pr1}/></div>
               
                   
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
