import React, { useState, useEffect } from "react";
import "../Style/Address.css";
import { toast } from "react-toastify";
import { IoMdAdd } from "react-icons/io";
import { useAuth } from "./AuthProvider";
import { addAddress, getAddress, removeAddress,getAddressById,updateAddress } from "../backend";
import { useNavigate,useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const AddressContent = () => {
  const { currentUser } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [showAddressPage, setShowAddressPage] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state for fetching
   const navigate = useNavigate();
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        setLoading(true); // Start loading
        const fetchAddress = await getAddress(currentUser.data.data._id);
        setAddresses(fetchAddress.addresses || []);
        setShowAddressPage(fetchAddress.addresses?.length === 0);
      } catch (error) {
        console.error("Error fetching address:", error);
      } finally {
        setLoading(false); // End loading once data is fetched
      }
    };

    fetchAddress();
  }, [currentUser]);

 

  const handleRemoveAddress = async (addressId) => {
    try {
      const updatedAddresses = await removeAddress(
        currentUser.data.data._id,
        addressId
      );
      setAddresses(updatedAddresses.addresses || []);
      toast.success("Address removed successfully!", { autoClose: 1500 });
      if (updatedAddresses.addresses.length === 0) {
        setShowAddressPage(true);
      }
    } catch (error) {
      toast.error("Error removing address!", { autoClose: 1500 });
    }
  };

  const handleShowAddressPage = () => {
    setShowAddressPage(true);
  };
 const path = "/address";
  return (
    <>
      {!addresses ? (
        <AddAddressPage
        />
      ) : (
        <div className="address-content">
        
          <div
            className="address-first-di"
            style={{ cursor: "pointer" }}
            onClick={()=>{
              navigate("/address/addaddress",{state:{path}})
            }}
          >
            <IoMdAdd />
            <h2>Add new address</h2>
          </div>
         
          {loading ? (
            <div>Loading addresses...</div> // Show loading message if still loading
          ) : addresses.length === 0 ? (
            <div>No addresses available</div>
          ) : (
            addresses.map((address) => (
              <div key={address._id} className="address-first-div">
                <p>{`${address.firstName}, ${address.lastName}, ${address.phoneNumber}, ${currentUser.data.data.societyName}, ${address.city}, ${address.zipCode}, ${address.state}`}</p>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                <button
                  onClick={() => handleRemoveAddress(address._id)}
                  className="address-remove-btn"
                >
                  Remove
                </button>
                <button
                 onClick={()=>{
                  navigate(`/address/updateaddress/${address._id}`,{state:{path}})
                }}
                  className="address-remove-btn"
                >
                  Edit
                </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
};

const AddAddressPage = () => {
  const { currentUser } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
   const [addresses,setAddresses] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { path,totalPriceWithTax,products } = location.state || {};
  const validateFields = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "Please enter your first name.";
    if (!lastName.trim()) newErrors.lastName = "Please enter your last name.";
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phoneNumber))
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number.";
    if (!country.trim()) newErrors.country = "Please enter your country.";
    if (!state.trim()) newErrors.state = "Please enter your state.";
    if (!zipCode.trim()) newErrors.zipCode = "Please enter your zip code.";
    if (!city.trim()) newErrors.city = "Please enter your city.";
    if (!fullAddress.trim())
      newErrors.fullAddress = "Please enter your full address.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        setLoading(true); // Start loading
        const fetchAddress = await getAddress(currentUser.data.data._id);
        setAddresses(fetchAddress.addresses || []);
      } catch (error) {
        console.error("Error fetching address:", error);
      } finally {
        setLoading(false); // End loading once data is fetched
      }
    };

    fetchAddress();
  }, [currentUser]);


  const handleAddAddress = async () => {
    if (!validateFields()) return;
    if(addresses){
      if(addresses.length>=5){
        toast.warn("Please remove one to add this address!")
        return ;
      }
    }
    setLoading(true);
    const userId = currentUser?.data?.data?._id;
    const newAddress = {
      firstName,
      lastName,
      phoneNumber,
      country,
      state,
      zipCode,
      city,
      fullAddress,
    };

    try {
      const savedAddress = await addAddress(userId, newAddress);
      setFirstName("");
      setLastName("");
      setPhoneNumber("");
      setCountry("");
      setState("");
      setZipCode("");
      setCity("");
      setFullAddress("");

      toast.success("Address added successfully!", { autoClose: 1500 });
      navigate(path,{state:{totalPriceWithTax,products}})
      // Update address list in AddressContent
    } catch (error) {
      console.error("Error saving address:", error);
      toast.error("Failed to save address. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="address-main">
      <div style={{ marginTop: "30px" }}>
        <h1 style={{ fontSize: "25px" }}>Add a New Address</h1>
      </div>
      <div className="address-page-content">
        <div className="checkout-input">
          <div>
            <input
              placeholder="Enter First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && <p style={{ color: "red" }}>{errors.firstName}</p>}
          </div>
          <div>
            <input
              placeholder="Enter Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}
          </div>
          <div>
            <input
              placeholder="Enter Email"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}
          </div>
          <div>
            <input
              placeholder="Enter Password"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}
          </div>
          <div>
            <input
              placeholder="Enter Phone No"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {errors.phoneNumber && <p style={{ color: "red" }}>{errors.phoneNumber}</p>}
          </div>
          <div>
            <input
              placeholder="Enter Falt No,"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            {errors.country && <p style={{ color: "red" }}>{errors.country}</p>}
          </div>
          <div>
            <input
              placeholder="Enter Tower No."
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            {errors.state && <p style={{ color: "red" }}>{errors.state}</p>}
          </div>
          {/* <div>
            <input
              placeholder="Enter Zip Code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
            {errors.zipCode && <p style={{ color: "red" }}>{errors.zipCode}</p>}
          </div>
          <div>
            <input
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            {errors.city && <p style={{ color: "red" }}>{errors.city}</p>}
          </div> */}
        </div>
        {/* <div className="checkout-area">
          <textarea
            placeholder="Enter Address"
            value={fullAddress}
            onChange={(e) => setFullAddress(e.target.value)}
          />
          {errors.fullAddress && <p style={{ color: "red" }}>{errors.fullAddress}</p>}
        </div> */}
      </div>
      <div style={{ marginTop: "20px" }}>
        <button onClick={handleAddAddress} disabled={loading} className="add-addres">
          {loading ? "Saving..." : "Add Address"}
        </button>
      </div>
    </div>
  );
};


const UpdateAddressPage = () => {
  const { id } = useParams(); // Get address ID from route params
  const navigate = useNavigate();
  const location = useLocation();
  // State for address fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [fullAddress, setFullAddress] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { path,totalPriceWithTax,products } = location.state || {};
  // Fetch and pre-fill address data
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        setLoading(true);
        const addressData = await getAddressById(id); // Fetch address details by ID
        if (addressData) {
          setFirstName(addressData.firstName);
          setLastName(addressData.lastName);
          setPhoneNumber(addressData.phoneNumber);
          setCountry(addressData.country);
          setState(addressData.state);
          setZipCode(addressData.zipCode);
          setCity(addressData.city);
          setFullAddress(addressData.fullAddress);
        }
      } catch (error) {
        console.error("Error fetching address:", error);
        toast.error("Failed to load address details. Please try again.");
        // navigate("/address"); // Redirect to address list if fetch fails
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, [id, navigate]);

  const validateFields = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "Please enter your first name.";
    if (!lastName.trim()) newErrors.lastName = "Please enter your last name.";
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phoneNumber))
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number.";
    if (!country.trim()) newErrors.country = "Please enter your country.";
    if (!state.trim()) newErrors.state = "Please enter your state.";
    if (!zipCode.trim()) newErrors.zipCode = "Please enter your zip code.";
    if (!city.trim()) newErrors.city = "Please enter your city.";
    if (!fullAddress.trim())
      newErrors.fullAddress = "Please enter your full address.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateAddress = async () => {
    if (!validateFields()) return;
     
    setLoading(true);
    const updatedAddress = {
      firstName,
      lastName,
      phoneNumber,
      country,
      state,
      zipCode,
      city,
      fullAddress,
    };
  
    try {
      await updateAddress(id, updatedAddress); // Update address API call
      toast.success("Address updated successfully!", { autoClose: 1500 });
      navigate(path,{state:{totalPriceWithTax,products}}) // Redirect to address list after success
    } catch (error) {
      console.error("Error updating address:", error);
      toast.error("Failed to update address. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="address-main">
      <div style={{ marginTop: "30px" }}>
        <h1 style={{ fontSize: "25px" }}>Update Address</h1>
      </div>
      <div className="address-page-content">
        <div className="checkout-input">
          <div>
            <input
              placeholder="Enter First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && <p style={{ color: "red" }}>{errors.firstName}</p>}
          </div>
          <div>
            <input
              placeholder="Enter Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}
          </div>
          <div>
            <input
              placeholder="Enter Phone No"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {errors.phoneNumber && <p style={{ color: "red" }}>{errors.phoneNumber}</p>}
          </div>
          <div>
            <input
              placeholder="Enter Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            {errors.country && <p style={{ color: "red" }}>{errors.country}</p>}
          </div>
          <div>
            <input
              placeholder="Enter State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            {errors.state && <p style={{ color: "red" }}>{errors.state}</p>}
          </div>
          <div>
            <input
              placeholder="Enter Zip Code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
            {errors.zipCode && <p style={{ color: "red" }}>{errors.zipCode}</p>}
          </div>
          <div>
            <input
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            {errors.city && <p style={{ color: "red" }}>{errors.city}</p>}
          </div>
        </div>
        <div className="checkout-area">
          <textarea
            placeholder="Enter Address"
            value={fullAddress}
            onChange={(e) => setFullAddress(e.target.value)}
          />
          {errors.fullAddress && <p style={{ color: "red" }}>{errors.fullAddress}</p>}
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
        <button onClick={handleUpdateAddress} disabled={loading} className="add-addres">
          {loading ? "Saving..." : "Update Address"}
        </button>
      </div>
    </div>
  );
};

export default UpdateAddressPage;


export { AddressContent, AddAddressPage, UpdateAddressPage };
