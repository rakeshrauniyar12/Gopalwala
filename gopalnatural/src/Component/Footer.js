import React from "react";
import "../Style/Footer.css"
import { Link } from 'react-router-dom';
import { FaFacebookF } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import em from "../Assets/Footer/email.png"
import lo from "../Assets/Footer/loca.png"
import ca from "../Assets/Footer/call.png"
const Footer = ()=>{
    return(
        <div className="footer-container">
           <div className="footer-sec-1">
             <div className="footer-logo"></div>
             <div className="footer-content-link">
                <h1 style={{color:"#ffff",marginBottom:"20px"}}>Quick Links</h1>
                <div className="footer-page-link">
                    <div>
                        <Link className="footer-page-link-p"><p>About Us</p></Link>
                        <Link className="footer-page-link-p"><p>Privacy Policy</p></Link>
                        <Link className="footer-page-link-p"><p>Terms and Conditions</p></Link>
                        <Link className="footer-page-link-p"><p>Purchasing Policy</p></Link>
                    </div>
                    <div>
                    <Link className="footer-page-link-p"><p>Contact Us</p></Link>
                        <Link className="footer-page-link-p"><p>Shopping Cart</p></Link>
                        <Link className="footer-page-link-p"><p>My Account</p></Link>
                        <Link className="footer-page-link-p"><p>Delivery Information</p></Link>
                    </div>
                </div>
                <div className="folow-us"><p>Follow us on</p></div>
                <div className="all-social-link">
                  <FaFacebookF/>
                  <FaXTwitter/>
                  <FaInstagram/>
                  <FaYoutube/>
                  <FaLinkedinIn/>
                </div>
             </div>
             <div className="footer-email">
                <div className="footer-email-1">
                    <div className="footer-email-1-image"><img src={em}/></div>
                    <div className="footer-email-1-content">
                        <p style={{fontSize:"20px",fontWeight:"500"}}>Email Id</p>
                        <p>gowpalanaturals@gmail.com</p>
                    </div>
                </div>
                <div className="footer-email-1">
                    <div className="footer-email-1-image"><img src={ca}/></div>
                    <div className="footer-email-1-content">
                        <p style={{fontSize:"20px",fontWeight:"500"}}>Phone No</p>
                        <p>044 6754 4987
                        </p>
                    </div>
                </div>
                <div className="footer-email-1">
                    <div className="footer-email-1-image"><img src={lo}/></div>
                    <div className="footer-email-1-content">
                        <p style={{fontSize:"20px",fontWeight:"500"}}>Address</p>
                        <p>044 6754 4987
                        </p>
                    </div>
                </div>
             </div>
           </div>
           <div className="footer-border"></div>
           <div className="copy-right-div">
            <p>Copyright © 2022. All rights reserved</p>
           </div>
        </div>
    )
}

export default Footer;