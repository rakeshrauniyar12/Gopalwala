import axios from "axios";
import { useAuth } from "./Component/AuthProvider";
import { toast } from "react-toastify";
const apiUrl = "https://gopalbackend.onrender.com/api";
// const apiUrl= "http://localhost:8080/api";
// const googleUrl = "http://localhost:8080";
const googleUrl = "https://gopalbackend.onrender.com";
const registerUser = async (email, password, societyName) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/register`, {
      email,
      password,
      societyName,
    });
    return response.data.user;
  } catch (err) {
    throw err.response?.data?.message || "Registration failed";
  }
};
async function sendOtp(email) {
  try {
    const response = await axios.post(`${apiUrl}/auth/send-otp`, {
      email,
    });

    console.log(response.data.message); // "OTP sent to your email"
    return response;
  } catch (error) {
    console.error(
      "Error sending OTP:",
      error.response ? error.response.data : error.message
    );
    alert("Failed to send OTP. Please try again.");
  }
}
async function ValidateOtp(email, otp) {
  try {
    const response = await axios.post(`${apiUrl}/auth/validate-otp`, {
      email,
      otp,
    });

    console.log(response.data.message); // "OTP sent to your email"
    return response;
  } catch (error) {
    console.error(
      "Error sending OTP:",
      error.response ? error.response.data : error.message
    );
  }
}
const updateSocietyName = async (userId, societyName) => {
  try {
    const response = await axios.patch(`${apiUrl}/auth/updatesocietyname/${userId}`, {
      societyName,
    });

    // Log the success response
    console.log('Society name updated:', response.data);
    return response.data; // Return the response for further use
  } catch (error) {
    // Handle errors appropriately
    console.error('Error updating society name:', error.response?.data || error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};
const registerUserWithGoogle = async (email) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/register/google`, {
      email,
    });
    console.log("Backend Register User",response)
    return response;
  } catch (err) {
    throw err.response?.data?.message || "Registration failed";
  }
};
const getUser = async () => {
  try {
    const url = `${googleUrl}/auth/login/success`;
    const { data } = await axios.get(url, { withCredentials: true });
    console.log("Backend Get User",data)
    const userDetails = await registerUserWithGoogle(data.user.emails[0].value);
    console.log("Backen User",userDetails)
    return userDetails;
  } catch (err) {
    console.log(err);
  }
};

const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/login`, {
      email,
      password,
    });
    return response;
  } catch (err) {
    throw err.response?.data?.message || "login failed";
  }
};
const updateUserPassword = async (userId, newPassword) => {
  try {
    if (!newPassword) {
      toast.warn("New password is required.");
      return;
    }

    const response = await axios.patch(`${apiUrl}/auth/updatepassword/${userId}`, {
      newPassword,
    });

    if (response.status === 200) {
      return response.data.message; // "Password updated successfully."
    }
  } catch (error) {
    if (error.response) {
      // Handle errors returned by the server
      return (error.response.data.message || "Failed to update password.");
    } else {
      // Handle other errors (network issues, etc.)
      console.error("An error occurred:", error);
      return ("An unexpected error occurred. Please try again.");
    }
  }
};
const getUserById = async (userId) => {
  try {
    const token = localStorage.getItem("token"); // Replace with your token storage method
    const res = await axios.get(`${apiUrl}/auth/getUserById/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add Bearer token if required
      },
    });
    return res; // Return the response data
  } catch (error) {
    console.error(
      "Error fetching user by ID:",
      error.response?.data || error.message
    );
    throw error; // Rethrow error for debugging or handling in calling code
  }
};

const addAddress = async (userId, addressData) => {
  try {
    const token = localStorage.getItem("token"); // Get the token from localStorage or your chosen method
    const response = await axios.post(
      `${apiUrl}/auth/saveAddress`,
      { userId, addressData },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token if required for authorization
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // Return the saved address data or success message
  } catch (error) {
    console.error(
      "Error adding address:",
      error.response?.data || error.message
    );
    throw error; // Rethrow the error for handling in calling code
  }
};

const getAddress = async (userId) => {
  try {
    const token = localStorage.getItem("token"); // Get the token
    const response = await axios.get(`${apiUrl}/auth/getAddress/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token for authorization
      },
    });
    return response.data; // Return the address data
  } catch (error) {
    console.error(
      "Error fetching address:",
      error.response?.data || error.message
    );
    throw error; // Rethrow the error for handling in calling code
  }
};
const saveSubscriptionProduct = async (userId, subscriptionData) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    const response = await axios.post(
      `${apiUrl}/auth/saveSubscriptionProduct`,
      { userId, subscriptionData },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include token for authorization
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // Return the saved subscription product or success message
  } catch (error) {
    console.error(
      "Error saving subscription product:",
      error.response?.data || error.message
    );
    throw error; // Rethrow the error for handling in calling code
  }
};
const getAddressById = async (addressId) => {
  try {
    const response = await axios.get(
      `${apiUrl}/auth/getAddressById/${addressId}`
    );
    return response.data; // Return the address details
  } catch (error) {
    console.error(
      "Error fetching address by ID:",
      error.response?.data || error.message
    );
    throw error; // Rethrow the error for handling in the calling code
  }
};

const removeAddress = async (userId, addressId) => {
  try {
    const response = await axios.delete(
      `${apiUrl}/auth/removeAddress/${userId}/${addressId}`
    );
    return response.data; // Return success message or confirmation
  } catch (error) {
    console.error(
      "Error removing address:",
      error.response?.data || error.message
    );
    throw error; // Rethrow the error for handling in calling code
  }
};

const getProduct = async () => {
  const response = await axios.get(`${apiUrl}/product/getAllProduct`);
  return response.data.products;
};
const getProductById = async (productId) => {
  const response = await axios.get(`${apiUrl}/product/getProduct/${productId}`);
  return response.data.product;
};
const getAllCartProduct = async () => {
  const cartProducts = await axios.get(
    `${apiUrl}/cartProduct/getAllCartProduct`
  );
  return cartProducts.data.products;
};
const addToCart = async (product) => {
  try {
    // Check if the product already exists in the cart
    const checkProduct = await axios.get(
      `${apiUrl}/cartProduct/getCartProduct/${product._id}`
    );
    console.log("Product already exists in the cart:", checkProduct.data);
    return false;
  } catch (error) {
    // If the product is not found (404), attempt to add it
    if (error.response && error.response.status === 404) {
      console.log("Product not in cart, adding it...");
      try {
        const response = await axios.post(
          `${apiUrl}/cartProduct/saveCartProduct`,
          product,
          {
            headers: {
              "Content-Type": "application/json", // Specify the content type
            },
          }
        );
        return response;
      } catch (postError) {
        console.error("Error adding product to cart:", postError.message);
        throw postError;
      }
    } else {
      // Handle other errors (e.g., network issues)
      console.error("Error checking product in cart:", error.message);
      throw error;
    }
  }
};
const updateCartProduct = async (productId, updatedData) => {
  const res = await axios.patch(
    `${apiUrl}/cartProduct/updateCartProduct/${productId}`,
    updatedData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};
const deleteCartProduct = async (productId) => {
  const res = await axios.delete(
    `${apiUrl}/cartProduct/deleteCartProduct/${productId}`
  );
  return res;
};

const saveOrder = async (orderData) => {
  try {
    // Send the order data to the backend using a POST request
    const response = await axios.post(
      `${apiUrl}/auth/saveOrder`, // Assuming your backend has a POST method to save orders
      orderData
    );

    // Return the response (order confirmation or details)
    return response.data;
  } catch (error) {
    console.error(
      "Error placing order:",
      error.response?.data || error.message
    );
    throw error; // Rethrow error for handling in calling code
  }
};
const fetchOrders = async (userId) => {
  try {
    const response = await axios.get(`${apiUrl}/auth/getOrder/${userId}`);
    console.log("User Orders:", response.data.orders);
    return response.data.orders; // Return orders to use in your frontend
  } catch (error) {
    console.error(
      "Error fetching orders:",
      error.response?.data || error.message
    );
  }
};
const fetchOrdersByUserAndOrderId = async (userId, orderId) => {
  const url = `${apiUrl}/auth/getOrderByUserAndOrderId/${userId}/${orderId}`;
  console.log("Attempting API call to:", url);

  try {
    const response = await axios.get(url);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};

const fetchOrdersByUserOrderAndProductId = async (
  userId,
  orderId,
  productId
) => {
  try {
    const response = await axios.get(
      `${apiUrl}/auth/getOrderByUserOrderAndProductId/${userId}/${orderId}/${productId}`
    );
    console.log("User Orders:", response.data);
    return response.data; // Return orders to use in your frontend
  } catch (error) {
    console.error(
      "Error fetching orders:",
      error.response?.data || error.message
    );
  }
};

const updateAddress = async (id, updatedData) => {
  try {
    const token = localStorage.getItem("token"); // Get the token from localStorage
    console.log(token);
    const response = await axios.patch(
      `${apiUrl}/auth/updateAddress/${id}`,
      updatedData, // Pass the updated address data
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token for authorization
        },
      }
    );
    return response.data; // Return the updated address data
  } catch (error) {
    console.error(
      "Error updating address:",
      error.response?.data || error.message
    );
    throw error; // Rethrow the error for handling in the calling code
  }
};
const getSubscriptionProducts = async (userId) => {
  try {
    const token = localStorage.getItem("token"); // Fetch token from localStorage or chosen storage
    const response = await axios.get(
      `${apiUrl}/auth/getSubscriptionProductByUserId/${userId}`
    );
    return response.data; // Return the fetched subscription products
  } catch (error) {
    console.error(
      "Error fetching subscription products:",
      error.response?.data || error.message
    );
    throw error; // Rethrow error for further handling in calling code
  }
};

export {
  getProduct,
  getUser,
  getSubscriptionProducts,
  registerUserWithGoogle,
  addToCart,
  saveOrder,
  getAllCartProduct,
  addAddress,
  getAddress,
  removeAddress,
  deleteCartProduct,
  registerUser,
  loginUser,
  getProductById,
  updateCartProduct,
  sendOtp,
  ValidateOtp,
  getUserById,
  getAddressById,
  updateAddress,
  saveSubscriptionProduct,
  fetchOrders,
  fetchOrdersByUserAndOrderId,
  fetchOrdersByUserOrderAndProductId,
  updateUserPassword,
  updateSocietyName
};
