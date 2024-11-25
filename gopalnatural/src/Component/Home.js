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
import { FaAngleRight } from "react-icons/fa";
import back from "../Assets/Home/footer-back.png";
import youtube from "../Assets/Home/logos_youtube-icon.png";
import last_sec from "../Assets/Home/last-sec.png";
import "../Style/Home.css";
import Footer from "./Footer";
import ProductCarousel from "./ProductC";
const Home = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);

  const products= [{image:apple,name:"Apple",quantity:"1kg",productPrice:"121",productDiscount:"7"},
    {image:orange,name:"Orange",quantity:"1kg",productPrice:"120",productDiscount:"5"},
    {image:mutton,name:"Fresh Mutton",quantity:"1kg",productPrice:"120",productDiscount:"5"},
    {image:chicken,name:"Fresh Chicken",quantity:"1kg",productPrice:"120",productDiscount:"5"},
    {image:milk1,name:"Fresh Milk",quantity:"1L",productPrice:"120",productDiscount:"5"},
    {image:curd,name:"Fresh Curd",quantity:"1kg",productPrice:"120",productDiscount:"5"},
    {image:tomato,name:"Tomato",quantity:"1kg",productPrice:"120",productDiscount:"5"},
  ]
  return (
    <>
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
            {products.map((product,index)=>(<div className="product">
              <div className="off-div">
                <p>{`${product.productDiscount} % off`}</p>
              </div>
              <div className="product-image">
                <img src={product.image} alt="Apple" />
              </div>
              <p className="productname-size">{product.name}</p>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
              >
                {`(${product.quantity} Kg)`}
              </p>
              <p className="productname-size">
                <span className="p-span">{`₹ ${product.productPrice}`}</span>
                {`₹ ${(Math.ceil(product.productPrice-(product.productPrice*product.productDiscount/100)))}`}
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
            </div>))}

          </div>
        </div>
      </div>

      <div className="product-categories-2">
        <div className="choose-content">
          <div className="choose-heading">
            <h3>Pick your offer.</h3>
            <h2>One more deal for you!</h2>
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

      <div className="product-categories-1">
        <div className="choose-content">
          <div className="choose-heading">
            <h3>Only Natural Goods</h3>
            <h2>Natural and Fresh Goods</h2>
          </div>
          <div className="product-button">
              <div className="product-button-1" 
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              >
                <div><p className="pb-p">New Products</p>
               { isHovered && <FaAngleRight style={{color:"#ffff"}}/>}
                </div>
                </div>
              <div className="product-button-1"
               onMouseEnter={() => setIsHovered1(true)}
               onMouseLeave={() => setIsHovered1(false)}
              >  <div><p className="pb-p">Top Selling</p>
                 { isHovered1 && <FaAngleRight style={{color:"#ffff"}}/>}
                </div></div>
              <div className="product-button-1"
               onMouseEnter={() => setIsHovered2(true)}
               onMouseLeave={() => setIsHovered2(false)}
              >  <div><p className="pb-p">Trending Products</p>
               { isHovered2 && <FaAngleRight style={{color:"#ffff"}}/>}
                </div></div>
              <div className="product-button-1"
                onMouseEnter={() => setIsHovered3(true)}
                onMouseLeave={() => setIsHovered3(false)}
              >  <div><p className="pb-p">New Products</p>
                { isHovered3 && <FaAngleRight style={{color:"#ffff"}}/>}
                </div></div>
          </div>
          <div className="product-append21">
            {/* first */}
            {products.map((product,index)=>(<div className="product">
              <div className="off-div">
                <p>{`${product.productDiscount} % off`}</p>
              </div>
              <div className="product-image">
                <img src={product.image} alt="Apple" />
              </div>
              <p className="productname-size">{product.name}</p>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
              >
                {`(${product.quantity} Kg)`}
              </p>
              <p className="productname-size">
                <span className="p-span">{`₹ ${product.productPrice}`}</span>
                {`₹ ${(Math.ceil(product.productPrice-(product.productPrice*product.productDiscount/100)))}`}
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
            </div>))}

          </div>
        </div>
      </div>

    <div className="home-sec-5">
    <div><img src={back}/></div>
    </div>
    <div className="product-categories-1" style={{backgroundColor:"#f5f5db"}}>
        <div className="choose-content">
          <div className="choose-heading">
            <h3>Just Organic Items</h3>
            <h2>Today's Special Offers</h2>
          </div>
          <div className="product-append21">
            {/* first */}
            {products.map((product,index)=>(<div className="product">
              <div className="off-div">
                <p>{`${product.productDiscount} % off`}</p>
              </div>
              <div className="product-image">
                <img src={product.image} alt="Apple" />
              </div>
              <p className="productname-size">{product.name}</p>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
              >
                {`(${product.quantity} Kg)`}
              </p>
              <p className="productname-size">
                <span className="p-span">{`₹ ${product.productPrice}`}</span>
                {`₹ ${(Math.ceil(product.productPrice-(product.productPrice*product.productDiscount/100)))}`}
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
            </div>))}

          </div>
        </div>
      </div>

      <div className="home-sec-6">
        <div className="home-sec-6-header">
          <h1>Subscribe to our monthly pass</h1>
          <p>Transparent Pricing for you</p>
        </div>
        <div className="home-sec-6-content">
          <div className="home-sec-6-content-1">
          <div>
            <p>Save More</p>
            <p style={{fontSize:"15px",fontWeight:"500",marginBottom:"10px"}}>With Good Plans</p>
            <p>Come and get on board in minutes Then save more for your next payment</p>
          </div>
          <div className="home-sec-6-content-1-img"><img src={last_sec}/></div>
          </div>
          <div className="home-sec-6-content-1">
          <div>
            <p>Save More</p>
            <p style={{fontSize:"15px",fontWeight:"500",marginBottom:"10px"}}>With Good Plans</p>
            <p>Come and get on board in minutes Then save more for your next payment</p>
          </div>
          <div className="home-sec-6-content-1-img"><img src={last_sec}/></div>
          </div>
          <div className="home-sec-6-content-1">
          <div>
            <p>Save More</p>
            <p style={{fontSize:"15px",fontWeight:"500",marginBottom:"10px"}}>With Good Plans</p>
            <p>Come and get on board in minutes Then save more for your next payment</p>
          </div>
          <div className="home-sec-6-content-1-img"><img src={last_sec}/></div>
          </div>
        </div>
      </div>
     </div>
    
  
    </>
  );
};

export default Home;
