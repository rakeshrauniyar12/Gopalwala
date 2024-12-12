import React, { useRef, useState, useEffect } from "react";
import wish from "../Assets/Navbar/wish.png";
import { FaRegStar } from "react-icons/fa";
import meat from "../Assets/Home/meat.png";
import fruits from "../Assets/Home/fruits.png";
import milk from "../Assets/Home/milk.png";
import vegetables from "../Assets/Home/vegetable.png";
import pr1 from "../Assets/Home/product/pr-1.png";
import pr2 from "../Assets/Home/product/pr-2.png";
import pr3 from "../Assets/Home/product/pr-3.png";
import { FaAngleRight } from "react-icons/fa";
import back from "../Assets/Home/footer-back.png";
import youtube from "../Assets/Home/logos_youtube-icon.png";
import last_sec from "../Assets/Home/last-sec.png";
import "../Style/Home.css";
import { toast } from "react-toastify";
import { getProduct, addToCart, getUser } from "../backend.js";
import ClipLoader from "react-spinners/ClipLoader";
import { useCart } from "./CartContext";
import { useNavigate,useLocation } from "react-router-dom";
import {useAuth} from "./AuthProvider";

const Home = () => {
  const {currentUser,login} = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addProduct } = useCart();
  const navigate = useNavigate();
  const signInMethod = localStorage.getItem("signInMethod");
 
  // console.log(id);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let getProducts = await getProduct();
        if(signInMethod==="google"){
          let googleUser = await getUser();
          console.log(googleUser)
           login(googleUser.data.token,googleUser.data.user._id);
        }
        setProducts(getProducts);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
console.log(currentUser);





  if(products.length>0){
  console.log("All Product", products[0].productPrice);
  }
  const handleAddToCart = async (product) => {
    const addProduct1 = await addToCart(product);
    addProduct(addProduct1);
    if (addProduct1) {
      toast.success("Product added to cart successfully.");
    } else {
      toast.warn("Product already in cart!");
    }
  };
  const navigateSubscription = (productId) => {
    navigate(`/subscription/${productId}`);
  };
  return (
    <>
      <div className="home-container">
        <div className="header-section">
          <div className="header-content">
            <p className="header-p">
              Eat organic food to maintain your health.
            </p>
            <p className="repu-p">
              A reputable brand dedicated to providing organic food.
            </p>
            <button className="header-btn">Shop Now</button>
          </div>
        </div>

        {/* <div className="choose-categories-1">
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
        </div> */}

        <div className="product-categories-1">
          <div className="choose-content">
            <div className="choose-heading">
              <h3>Genuine Organic Goods</h3>
              <h2>Trending Items</h2>
            </div>
            <div className="product-append">
              {/* first */}
              {loading ? (
                <div className="spinner-container">
                  <ClipLoader color={"#36D7B7"} loading={loading} size={50} />
                </div>
              ) : products.length === 0 ? (
                <div>No Product found.</div>
              ) : (
                products.map((product, index) => (
                  <div className="product">
                    <div className="off-div">
                      <p>{`${Number(product.productDiscount)} % off`}</p>
                    </div>
                    <div className="product-image">
                      <img src={product.productImage} alt="Apple" />
                    </div>
                    <p className="productname-size">{product.productName}</p>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "400",
                        marginTop: "5px",
                        marginBottom: "5px",
                      }}
                    >
                      {`(${Number(product.productQuantity)} Kg)`}
                    </p>
                    <p className="productname-size">
                      <span className="p-span">{`₹ ${Number(
                        product.productPrice
                      )}`}</span>
                      {`₹ ${Math.ceil(
                        Number(product.productPrice) -
                          (Number(product.productPrice) *
                            Number(product.productDiscount)) /
                            100
                      )}`}
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
                      <div className="product-buy-subs">
                        <button
                          className="product-btn"
                          onClick={() => {
                            handleAddToCart(product);
                          }}
                        >
                          Buy Once
                        </button>
                        <button
                          className="product-btn"
                          onClick={() => {
                            navigateSubscription(product._id);
                          }}
                        >
                          Subscriptions
                        </button>
                      </div>

                      <div className="cart-icon-div1">
                        <img src={wish} />
                      </div>
                    </div>
                  </div>
                ))
              )}
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
              <h3 style={{ fontSize: "16px", fontWeight: "600" }}>
                Enjoy a 30% discount on fruit!
              </h3>
              <p className="descr-p">
                Offers fruit combo packs that are packed with fiber and include
                fruits like banana, kiwi, apple, and pear
              </p>
              <div className="img-btn">
                <div className="img-btn1">
                  <button className="header-btn1">Shop Now</button>
                </div>
                <div className="img-btn2">
                  {" "}
                  <img src={pr2} />
                </div>
              </div>
            </div>
            <div className="product-desc-2">
              <h3 style={{ fontSize: "16px", fontWeight: "600" }}>
                Enjoy a 25% discount on fruit!
              </h3>
              <p className="descr-p">
                Green Brinjal Round, Coriander, Snake Gourd ; Green Brinjal
                Long, Drumstick, Radish White ; White Brinjal Round, Long Beans,
                Beetroot.
              </p>
              <div className="img-btn">
                <div className="img-btn1">
                  <button className="header-btn1">Shop Now</button>
                </div>
                <div className="img-btn2">
                  {" "}
                  <img src={pr3} />
                </div>
              </div>
            </div>
            <div className="product-desc-3">
              <h3 style={{ fontSize: "16px", fontWeight: "600" }}>
                Enjoy a 30% discount on fruit!
              </h3>
              <p className="descr-p">
                Offers up to 30% off on meat orders, including chicken, pork,
                mutton, fish, and seafood. They also offer loyalty discounts and
                exclusive mutton offers.
              </p>
              <div className="img-btn">
                <div className="img-btn1">
                  <button className="header-btn1">Shop Now</button>
                </div>
                <div className="img-btn2">
                  {" "}
                  <img src={pr1} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="product-categories-1">
          <div className="choose-content">
            <div className="choose-heading">
              <h3>Organic foods without adulteration</h3>
              <h2>Natural and Fresh Goods</h2>
            </div>
            <div className="product-button">
              <div
                className="product-button-1"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div>
                  <p className="pb-p">New Products</p>
                  {isHovered && <FaAngleRight style={{ color: "#ffff" }} />}
                </div>
              </div>
              <div
                className="product-button-1"
                onMouseEnter={() => setIsHovered1(true)}
                onMouseLeave={() => setIsHovered1(false)}
              >
                {" "}
                <div>
                  <p className="pb-p">Top Selling</p>
                  {isHovered1 && <FaAngleRight style={{ color: "#ffff" }} />}
                </div>
              </div>
              <div
                className="product-button-1"
                onMouseEnter={() => setIsHovered2(true)}
                onMouseLeave={() => setIsHovered2(false)}
              >
                {" "}
                <div>
                  <p className="pb-p">Trending Products</p>
                  {isHovered2 && <FaAngleRight style={{ color: "#ffff" }} />}
                </div>
              </div>
              <div
                className="product-button-1"
                onMouseEnter={() => setIsHovered3(true)}
                onMouseLeave={() => setIsHovered3(false)}
              >
                {" "}
                <div>
                  <p className="pb-p">Top Rated</p>
                  {isHovered3 && <FaAngleRight style={{ color: "#ffff" }} />}
                </div>
              </div>
            </div>
            <div className="product-append21">
              {/* first */}
              {loading ? (
                <div className="spinner-container">
                  <ClipLoader color={"#36D7B7"} loading={loading} size={50} />
                </div>
              ) : products.length === 0 ? (
                <div>No Product found.</div>
              ) : (
                products.map((product, index) => (
                  <div className="product">
                    <div className="off-div">
                      <p>{`${product.productDiscount} % off`}</p>
                    </div>
                    <div className="product-image">
                      <img src={product.productImage} alt="Apple" />
                    </div>
                    <p className="productname-size">{product.productName}</p>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "400",
                        marginTop: "5px",
                        marginBottom: "5px",
                      }}
                    >
                      {`(${product.productQuantity} Kg)`}
                    </p>
                    <p className="productname-size">
                      <span className="p-span">{`₹ ${product.productPrice}`}</span>
                      {`₹ ${Math.ceil(
                        product.productPrice -
                          (product.productPrice * product.productDiscount) / 100
                      )}`}
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
                      <div className="product-buy-subs">
                        <button
                          className="product-btn"
                          onClick={() => {
                            handleAddToCart(product);
                          }}
                        >
                          Buy Once
                        </button>
                        <button
                          className="product-btn"
                          onClick={() => {
                            navigateSubscription(product._id);
                          }}
                        >
                          Subscriptions
                        </button>
                      </div>
                      <div className="cart-icon-div1">
                        <img src={wish} />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="home-sec-5" style={{ position: "relative" }}>
          <div className="home-sec-5-iii">
            <img src={back} />
          </div>
          <div className="header-content-down">
            <p className="header-p-down">
              Organic and Nutritious Fresh Produce
            </p>
            <p className="repu-p-down">
              Fresh from the farm, straight to your plate, Nourish your body
              with nature’s bounty, Taste the goodness of nature,Fuel your day
              with the power of fruits and veggies
            </p>
            <button className="header-btn">Shop Now</button>
          </div>
        </div>
        <div
          className="product-categories-1"
          style={{ backgroundColor: "#f5f5db" }}
        >
          <div className="choose-content">
            <div className="choose-heading">
              <h3>Just Organic Items</h3>
              <h2>Today's Special Offers</h2>
            </div>
            <div className="product-append21">
              {/* first */}
              {loading ? (
                <div className="spinner-container">
                  <ClipLoader color={"#36D7B7"} loading={loading} size={50} />
                </div>
              ) : products.length === 0 ? (
                <div>No Product found.</div>
              ) : (
                products.map((product, index) => (
                  <div className="product">
                    <div className="off-div">
                      <p>{`${product.productDiscount} % off`}</p>
                    </div>
                    <div className="product-image">
                      <img src={product.productImage} alt="Apple" />
                    </div>
                    <p className="productname-size">{product.productName}</p>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "400",
                        marginTop: "5px",
                        marginBottom: "5px",
                      }}
                    >
                      {`(${product.productQuantity} Kg)`}
                    </p>
                    <p className="productname-size">
                      <span className="p-span">{`₹ ${product.productPrice}`}</span>
                      {`₹ ${Math.ceil(
                        product.productPrice -
                          (product.productPrice * product.productDiscount) / 100
                      )}`}
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
                      <div className="product-buy-subs">
                        <button
                          className="product-btn"
                          onClick={() => {
                            handleAddToCart(product);
                          }}
                        >
                          Buy Once
                        </button>
                        <button
                          className="product-btn"
                          onClick={() => {
                            navigateSubscription(product._id);
                          }}
                        >
                          Subscriptions
                        </button>
                      </div>
                      <div className="cart-icon-div1">
                        <img src={wish} />
                      </div>
                    </div>
                  </div>
                ))
              )}
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
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: "500",
                    marginBottom: "10px",
                  }}
                >
                  With Good Plans
                </p>
                <p>
                  Come and get on board in minutes Then save more for your next
                  payment
                </p>
              </div>
              <div className="home-sec-6-content-1-img">
                <img src={last_sec} />
              </div>
            </div>
            <div className="home-sec-6-content-1">
              <div>
                <p>Save More</p>
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: "500",
                    marginBottom: "10px",
                  }}
                >
                  With Good Plans
                </p>
                <p>
                  Come and get on board in minutes Then save more for your next
                  payment
                </p>
              </div>
              <div className="home-sec-6-content-1-img">
                <img src={last_sec} />
              </div>
            </div>
            <div className="home-sec-6-content-1">
              <div>
                <p>Save More</p>
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: "500",
                    marginBottom: "10px",
                  }}
                >
                  With Good Plans
                </p>
                <p>
                  Come and get on board in minutes Then save more for your next
                  payment
                </p>
              </div>
              <div className="home-sec-6-content-1-img">
                <img src={last_sec} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
