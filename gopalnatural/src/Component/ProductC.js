import React from "react";
import { Link } from "react-router-dom";
import "../Style/ProductC.css"
import chicken from "../Assets/Home/product/chicken.png";
import tomato from "../Assets/Home/product/tomato.png";
import orange from "../Assets/Home/product/orange.png";
import mutton from "../Assets/Home/product/mutton.png";
import milk1 from "../Assets/Home/product/milk.png";
import curd from "../Assets/Home/product/curd.png";
import apple from "../Assets/Home/product/apple.png";
const ProductCarousel = () => {


    const products= [{image:apple,name:"Apple",quantity:"1kg",productPrice:"121",productDiscount:"7"},
        {image:orange,name:"Orange",quantity:"1kg",productPrice:"120",productDiscount:"5"},
        {image:mutton,name:"Fresh Mutton",quantity:"1kg",productPrice:"120",productDiscount:"5"},
        {image:chicken,name:"Fresh Chicken",quantity:"1kg",productPrice:"120",productDiscount:"5"},
        {image:milk1,name:"Fresh Milk",quantity:"1L",productPrice:"120",productDiscount:"5"},
        {image:curd,name:"Fresh Curd",quantity:"1kg",productPrice:"120",productDiscount:"5"},
        {image:tomato,name:"Tomato",quantity:"1kg",productPrice:"120",productDiscount:"5"},
      ]
  return (
    <div
      className="newArrivalsMain"
    >
      <div className="newArrivalsClothes">
        {products.map((product, index) => (
          <Link
            key={index}
            className="newArrivalEachDiv"
          >
            {/* <div key={index} className="newArrivalEachDiv"> */}
            <div className="newClotheImgDiv">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="newClotheInfoDiv">
              <p className="newClotheTitle">{product.name}</p>
            
                <h2 className="newClothePrice">
                  {`₹${product.productPrice}`}
                  <span>Onwards</span>
                </h2>
             
            </div>
            {/* </div> */}
          </Link>
        
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;