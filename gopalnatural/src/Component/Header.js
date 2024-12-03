import React, { useEffect, useState } from "react";
import "../Style/Header.css";
import { FaLocationDot } from "react-icons/fa6";
import { MdAccountBox } from "react-icons/md";
import { IoMdCall } from "react-icons/io";
import { RiAccountPinBoxFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";
const Header = () => {
  const { isLoggedIn, logout } = useAuth();

    return (
        <div className="header-container">
            <div className="header-1-section">
                <div className="header-1">
                    <div className="header-1-content">
                        <FaLocationDot style={{ fontSize: "24px" }} />
                        <p>12 Poor Street, Hyderabad.</p>
                    </div>
                    <div className="header-1-content">
                        <IoMdCall style={{ fontSize: "24px" }} />
                        <p>+1 964 565 87652</p>
                    </div>
                </div>

                <div className="header-2">
                    {isLoggedIn ? (
                        <div className="header-2-content">
                            <Link to="/account" className="header-profile">
                                <MdAccountBox />
                                <p>My Profile</p>
                            </Link>
                          
                        </div>
                    ) : (
                        <>
                            <Link to="/register" className="header-register">
                                <div className="header-2-content">
                                    <MdAccountBox />
                                    <p>Register</p>
                                </div>
                            </Link>
                            <Link to="/login" className="header-register1">
                                <div className="header-2-content-2">
                                    <RiAccountPinBoxFill />
                                    <p>Sign in</p>
                                </div>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
