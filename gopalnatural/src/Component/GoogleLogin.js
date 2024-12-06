import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";


const GoogleRegister = () => {
  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("User Info:", decoded);
    // Use decoded information (e.g., name, email) in your app
  };

  const handleLoginError = () => {
    console.error("Login Failed");
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div>
        <h1>Google Sign-In Example</h1>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleRegister;
