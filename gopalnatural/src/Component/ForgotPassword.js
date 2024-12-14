import React, { useState } from "react";
import "../Style/Login.css";
import { toast } from "react-toastify";
import { sendOtp, ValidateOtp, updateUserPassword } from "../backend";
import { useNavigate, useLocation } from "react-router-dom";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      const res = await sendOtp(email);
      console.log(res);
      if (res.data.message === "OTP sent to your email") {
        toast.success("Otp Sent Successfully.");
        navigate("/account/validateotp", { state: { email } });
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  return (
    <div className="login-main-container">
      <div className="login-content">
        <div className="login-content-1">
          <p>Please enter your details</p>
          <div className="login-content-input-1">
            <input
              type="email"
              name="email"
              placeholder="Enter Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
            />
          </div>
          <button
            className="login-content-btn"
            onClick={handleSendOtp} // Properly invoke the function
          >
            Send OTP
          </button>
        </div>
      </div>
    </div>
  );
};

const UpdateUserPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = location.state || {};
  console.log(userId)
  const handlePasswordUpdate = async () => {
    if(newPassword!==confirmNewPassword){
      toast.warn("password does not match!")
      return;
    }
    try {
      const message = await updateUserPassword(userId, newPassword);
      if(message==="Password updated successfully."){
        toast.success(message);
        setNewPassword(""); // Clear the input field
        navigate("/login");
      } else{
        toast.error(message);
      }
     
    } catch (error) {
      console.log("Error",error)
    }
  
  };

  return (
    <div className="login-main-container">
    <div className="login-content">
      <div className="login-content-1">
      <h2>Update Password</h2>
        <div className="login-content-input-1">
        <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Enter New Password"
      />
        </div>
        <div className="login-content-input-1">
        <input
        type="password"
        value={confirmNewPassword}
        onChange={(e) => setConfirmNewPassword(e.target.value)}
        placeholder="Confirm New Password"
      />
        </div>
        <button className="login-content-btn" onClick={handlePasswordUpdate}>
         Update Password
        </button>
      </div>
    </div>
  </div>
  );
};

const ValidateOtpMethod = () => {
  const [otp, setOtp] = useState(["", "", "", "", ""]); // Array to hold the OTP digits
  const location = useLocation();
  const { email } = location.state;
   const navigate = useNavigate();
  const handleValidateOtp = async () => {
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    const otpString = otp.join(""); // Concatenate OTP digits into a string
    if (otpString.length !== 5) {
      toast.error("Please enter a valid 5-digit OTP.");
      return;
    }

    try {
      const res = await ValidateOtp(email, otpString);
      
      const userId= res?.data.userId;
      console.log(res);
      console.log(userId);
       if(userId){
        toast.success("OTP Validated Successfully.");
        navigate("/account/updatepassword",{state:{userId}})
       }else{
        console.log("User Id is not available")
       }
      
    } catch (error) {
      console.error("Error validating OTP:", error);
      toast.error("Failed to validate OTP. Please try again.");
    }
  };

  const handleOtpChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value.slice(0, 1); // Allow only one digit per input
    setOtp(newOtp);

    // Move to the next input field if the current field is filled
    if (e.target.value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  return (
    <div className="login-main-container">
      <div className="login-content">
        <div className="login-content-1">
          <p>Please enter your details</p>
          <div className="login-content-input-1">
            <input
              type="email"
              name="email"
              placeholder="Enter Email ID"
              value={email}
              readOnly
            />
          </div>
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                id={`otp-input-${index}`}
                value={digit}
                maxLength="1"
                onChange={(e) => handleOtpChange(e, index)}
                className="otp-input"
                autoFocus={index === 0}
              />
            ))}
          </div>
          <button className="login-content-btn" onClick={handleValidateOtp}>
            Validate OTP
          </button>
        </div>
      </div>
    </div>
  );
};

// A mock of the ValidateOtp function to simulate OTP validation
// const ValidateOtp = async (email, otp) => {
//     // Simulate an API request to validate the OTP
//     if (otp === '12345') {
//         return { success: true };
//     }
//     throw new Error('Invalid OTP');
// };

// export default ValidateOtpMethod;

export { ForgotPassword, ValidateOtpMethod, UpdateUserPassword };
