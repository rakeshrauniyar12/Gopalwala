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
                <p>{` ${address.flatNumber}, ${address.towerNumber},${currentUser.data.data.societyName},${address.firstName}, ${address.lastName}, ${address.phoneNumber} `}</p>
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
  const [flatNumber, setFlatNumber] = useState("");
  const [towerNumber, setTowerNumber] = useState("");
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
    if (!flatNumber.trim()) newErrors.flatNumber = "Please enter flat number.";
    if (!towerNumber.trim()) newErrors.towerNumber = "Please enter tower number.";

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
      flatNumber,
      towerNumber,
    };

    try {
      const savedAddress = await addAddress(userId, newAddress);
      setFirstName("");
      setLastName("");
      setPhoneNumber("");
      setFlatNumber("");
      setTowerNumber("");

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
              placeholder="Enter Phone No"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {errors.phoneNumber && <p style={{ color: "red" }}>{errors.phoneNumber}</p>}
          </div>
          <div>
            <input
              placeholder="Enter Falt No,"
              value={flatNumber}
              onChange={(e) => setFlatNumber(e.target.value)}
            />
            {errors.flatNumber && <p style={{ color: "red" }}>{errors.flatNumber}</p>}
          </div>
          <div>
            <input
              placeholder="Enter Tower No."
              value={towerNumber}
              onChange={(e) => setTowerNumber(e.target.value)}
            />
            {errors.towerNumber && <p style={{ color: "red" }}>{errors.towerNumber}</p>}
          </div>
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
  const [flatNumber, setFlatNumber] = useState("");
  const [towerNumber, setTowerNumber] = useState("");

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
          setFlatNumber(addressData.flatNumber)
          setTowerNumber(addressData.towerNumber)
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
    if (!flatNumber.trim()) newErrors.flatNumber = "Please enter your flat number";
    if (!towerNumber.trim()) newErrors.towerNumber = "Please enter your tower number";

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
      flatNumber,
      towerNumber,
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
              placeholder="Enter Flat No."
              value={flatNumber}
              onChange={(e) => setFlatNumber(e.target.value)}
            />
            {errors.flatNumber && <p style={{ color: "red" }}>{errors.flatNumber}</p>}
          </div>
          <div>
            <input
              placeholder="Enter Tower No."
              value={towerNumber}
              onChange={(e) => setTowerNumber(e.target.value)}
            />
            {errors.towerNumber && <p style={{ color: "red" }}>{errors.towerNumber}</p>}
          </div>
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
        <button onClick={handleUpdateAddress} disabled={loading} className="add-addres">
          {loading ? "Saving..." : "Update Address"}
        </button>
      </div>
    </div>
  );
};

export default UpdateAddressPage;


export { AddressContent, AddAddressPage, UpdateAddressPage };
