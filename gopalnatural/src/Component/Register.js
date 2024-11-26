import React,{useState} from "react";
import "../Style/Login.css"
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";

const Register = ()=>{
    const [isRotated, setIsRotated] = useState(false);
    const [showSociety,setShowSociety] = useState(false);
    const handleRotate = () => {
        setIsRotated((prev) => !prev);
      };
    const handleShowSociety = ()=>{
        setShowSociety(!showSociety);
       
    }
    return(
        <div className='login-main-container'>
        <div className='login-content'>
         <div className='login-content-1'>
             <h1 className='login-h1'>Welcome Back</h1>
             <p>Please enter your details</p>
             <div className='login-content-input-1'>
             <input placeholder='Enter Email ID'/>
             </div>
             <div className='login-content-input-1'>
             <input placeholder='Enter Password'/>
             </div>
             <div className='login-content-input-1'>
             <input placeholder='Confirm Password'/>
             </div>
             <div className="select-society">
                <p>Select Your Society</p>
                <RiArrowDropDownLine
                 style={{
                    fontSize: "60px",
                    transform: isRotated ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                    cursor:"pointer"
                  }}
                  onClick={()=>{
                    handleRotate()
                    handleShowSociety()
                  }}
                 />
              </div>
             {showSociety && <div className="society-dropdown">
                <p>Tata Promont</p>
                <p>Sobha Neopolis</p>
                <p>Embassy Lake</p>
                <p>Felicity Engrace</p>
                <p>Sattva Aeropolis</p>
                <p>Suncity</p>
                <p>Grey Stone</p>
              </div>}
              
             <div className='login-content-input-3'>
                 <input type='checkbox'/>
                 <p>Remember me for 30 Days</p>
             </div>
             <button className='login-content-btn'>Register</button>
             <div className='login-footer-content'>
             <div className='login-content-google'>
                 <p>Sign in with google</p>
                <FcGoogle style={{height:"30px",width:"30px"}}/>
             </div>
            <p style={{marginTop:"20px"}}>I have an account ? <Link to={"/login"} className='login-forgot'>Login</Link></p>
             </div>
        
         </div>
        </div>
     </div>
    )
}

export default Register;