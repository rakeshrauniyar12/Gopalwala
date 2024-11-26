import React,{useEffect,useState} from "react";
import "../Style/Cart.css"
import apple from "../Assets/Home/product/apple.png";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";

const Cart = () => {
   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
   const [products,setProducts] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
 
   useEffect(() => {
     const fetchProducts = async () => {
       try {
         const response = await axios.get("https://gopalbackend.onrender.com/api/cartProduct/getAllCartProduct");
         setProducts(response.data.products);
         setLoading(false);
       } catch (error) {
         setError(error.message);
         setLoading(false);
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
    // const products= [{productImage:apple,productName:"Apple",productUnit:"Kg",productQuantity:"1",productPrice:"121",productDiscount:"7"},
    //     {productImage:apple,productName:"Apple",productUnit:"Kg",productQuantity:"1",productPrice:"121",productDiscount:"7"},
    //   ]
      const totalProductPrice=20.00;

  return (
     <div className="cart-main-container">
        {!isMobile?
        <>
        <div className="cart-header">
           <div><p>Product</p></div>
           <div><p>Unit</p></div>
           <div><p>Price</p></div>
           <div><p>Quantity</p></div>
           <div><p>Total</p></div>
           <div><p>Remove from cart</p></div>
        </div>

        <div className="cart-product-append">
     {products.map((product,index) => (
          <div key={index} className="cart-product">
           <div>
            <div className="cart-product-image"><img src={product.productImage}/></div>
           <p style={{color:"#3d8e41"}}>{product.productName}</p>
           </div>
          <div><p>{product.productUnit}</p></div>
         <div><p>{`₹ ${product.productPrice}`}</p></div>
            <div><p>{product.productQuantity}</p></div>
           <div><p >{`₹ ${product.productPrice*product.productQuantity}`}</p></div>
             <div><IoMdClose style={{color:"#3d8e41",fontSize:"20px",cursor:"pointer"}}/></div>
          </div>
        ))}
     </div>
     </>
     :
       <>
       <div className="cart-product-mobile">
           {
            products.map((product,index)=>(
               <div key={index}>
                 <div className="cart-mobile-image"><img src={product.productImage}/></div>
                 <div className="cart-mobile-heading">
                   <div style={{borderTop:"1.6px solid #9e9e90",borderBottom:"1.6px solid #9e9e90"}}>
                     <b>Product:</b>
                     <p>{product.productName}</p>
                   </div>
                   <div>
                     <b>Unit:</b>
                     <p>{product.productUnit}</p>
                   </div>
                   <div style={{borderTop:"1.6px solid #9e9e90",borderBottom:"1.6px solid #9e9e90"}}>
                     <b>Price:</b>
                     <p>{product.productPrice}</p>
                   </div>
                   <div>
                     <b>Quantity:</b>
                     <p>{product.productQuantity}</p>
                   </div>
                   <div style={{borderTop:"1.6px solid #9e9e90",borderBottom:"1.6px solid #9e9e90"}}>
                     <b>Total:</b>
                     <p>{product.productQuantity*product.productPrice}</p>
                   </div>
                   <div style={{borderBottom:"1.6px solid #9e9e90"}}>
                     <b>Remove:</b>
                     <div><IoMdClose style={{color:"#3d8e41",fontSize:"20px",cursor:"pointer"}}/></div>
                   </div>
                  </div>
               </div>
            ))
           }
       </div>
       </>
     }

     <div className="cart-total">
        <div className="cart-total-1"><p>Cart Total</p></div>
        <div className="cart-total-2">
            <div><p>Price Total</p><p>{`₹ ${totalProductPrice}`}</p></div>
            <div><p>SGST</p><p>{`₹ ${totalProductPrice}`}</p></div>
            <div><p>CGST</p><p>{`₹ ${totalProductPrice}`}</p></div>
            <div style={{borderBottom:"none"}}><p>Total</p><p>{`₹ ${totalProductPrice}`}</p></div>
            <Link to={"/checkout"}><button className="cart-btn">Proceed to checkout</button></Link>
        </div>
       
     </div>
     </div>
   
     
  );
};

export default Cart;
