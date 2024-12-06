import axios from "axios";

// const apiUrl= "https://gopalbackend.onrender.com/api";
const apiUrl= "http://localhost:8080/api";

const registerUser = async (email,password,societyName)=>{
  try {
    const response = await axios.post(
      `${apiUrl}/auth/register`,
      { email, password, societyName }
    );
    return response.data.user;
  } catch (err) {
    throw (err.response?.data?.message || "Registration failed");
  }   
}
const getUser = async () => {
  try {
    const url = `http://localhost:8080/auth/login/success`;
    const { data } = await axios.get(url, { withCredentials: true });
      return data;
  } catch (err) {
    console.log(err);
  }
};
const loginUser = async (email,password)=>{
try{
  const response = await axios.post(`${apiUrl}/auth/login`, {
    email,
    password,
  });
  return response;
} catch(err){
  throw (err.response?.data?.message || "login failed");
}
}

const getUserById = async (userId) => {
  console.log("Get user Id",userId);
  try {
    const token = localStorage.getItem("token"); // Replace with your token storage method
    console.log(apiUrl)
    console.log("Token",token)
    const res = await axios.get(`${apiUrl}/auth/getUserById/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add Bearer token if required
      },
    });
    console.log("Backend",res);
    return res; // Return the response data
  } catch (error) {
    console.error("Error fetching user by ID:", error.response?.data || error.message);
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
    console.error("Error adding address:", error.response?.data || error.message);
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
    console.error("Error fetching address:", error.response?.data || error.message);
    throw error; // Rethrow the error for handling in calling code
  }
};

const getAddressById = async (addressId) => {
  try {
    const response = await axios.get(`${apiUrl}/auth/getAddressById/${addressId}`);
    return response.data; // Return the address details
  } catch (error) {
    console.error("Error fetching address by ID:", error.response?.data || error.message);
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
    console.error("Error removing address:", error.response?.data || error.message);
    throw error; // Rethrow the error for handling in calling code
  }
};





const getProduct = async ()=>{
    const response = await axios.get(`${apiUrl}/product/getAllProduct`);
      return response.data.products;
}
const getProductById = async (productId)=>{
  const response = await axios.get(`${apiUrl}/product/getProduct/${productId}`);
    return response.data.product;
}
const getAllCartProduct = async ()=>{
  const cartProducts  = await axios.get(`${apiUrl}/cartProduct/getAllCartProduct`);
  return cartProducts.data.products;
}
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
  const res = await axios.patch(`${apiUrl}/cartProduct/updateCartProduct/${productId}`, updatedData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};
const deleteCartProduct = async (productId)=>{
    const res= await axios.delete(`${apiUrl}/cartProduct/deleteCartProduct/${productId}`);
   return res;
}


const saveOrder = async (orderData) => {
  try {
   // Send the order data to the backend using a POST request
    const response = await axios.post(
      `${apiUrl}/auth/saveOrder`, // Assuming your backend has a POST method to save orders
      orderData,
    )

    // Return the response (order confirmation or details)
    return response.data; 
  } catch (error) {
    console.error("Error placing order:", error.response?.data || error.message);
    throw error; // Rethrow error for handling in calling code
  }
};
const fetchOrders = async (userId) => {
  try {
    const response = await axios.get(`${apiUrl}/auth/getOrder/${userId}`);
    console.log("User Orders:", response.data.orders);
    return response.data.orders; // Return orders to use in your frontend
  } catch (error) {
    console.error("Error fetching orders:", error.response?.data || error.message);
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
    console.error("Error updating address:", error.response?.data || error.message);
    throw error; // Rethrow the error for handling in the calling code
  }
};


export  {getProduct,getUser,addToCart,saveOrder,getAllCartProduct,addAddress,getAddress,removeAddress,deleteCartProduct,registerUser,loginUser,getProductById,updateCartProduct,getUserById,getAddressById,updateAddress,fetchOrders};