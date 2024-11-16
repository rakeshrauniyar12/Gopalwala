import React from "react";
import "../Style/Header.css"
import { FaLocationDot } from "react-icons/fa6";
import { MdAccountBox } from "react-icons/md";
import { IoMdCall } from "react-icons/io";
import { RiAccountPinBoxFill } from "react-icons/ri";


const Header = ()=>{
    return(
        <div className="header-container">
            <div className="header-1-section">
            <div className="header-1">
            <div className="header-1-content">
                <FaLocationDot style={{fontSize:"24px"}}/>
                <p>12 Poor Street, New York.</p>
            </div>
            <div className="header-1-content">
                <IoMdCall style={{fontSize:"24px"}}/>
                <p>+1 964 565 87652</p>
            </div>
          </div>
          <div className="header-2">
            <div className="header-2-content">
           <MdAccountBox/>
           <p>Register</p>
            </div>
            <div className="header-2-content-2">
            <RiAccountPinBoxFill/>
            <p>Sign in</p>
            </div>
          </div>
            </div>
        
        </div>
    )
}

export default Header;