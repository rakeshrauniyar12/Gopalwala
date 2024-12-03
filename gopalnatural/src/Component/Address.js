import React, { createContext, useState, useEffect, useContext } from "react";
import "../Style/Address.css";
import { toast } from "react-toastify";
import { IoMdAdd } from "react-icons/io";
import { useAuth } from "./AuthProvider";
import { addAddress,getAddress,removeAddress } from "../backend";

const Address = () => {
  const { addresses, setAddresses } = useContext(AddressContext);
  const [showAddressPage, setShowAddressPage] = useState(false);

  const toggleAddressPage = () => {
    setShowAddressPage(!showAddressPage);
  };

  const handleAddressAdded = () => {
    setShowAddressPage(false); // Switch back to AddressContent after address added
  };

  return (
    <>
      {!showAddressPage && addresses.addresses ? (
        <AddressContent toggleAddressPage={toggleAddressPage} />
      ) : (
        <AddressPage
          toggleAddressPage={toggleAddressPage}
          handleAddressAdded={handleAddressAdded}
        />
      )}
    </>
  );
};

export const AddressContent = ({ toggleAddressPage }) => {
  const { currentUser } = useAuth();
  const { addresses, setAddresses } = useContext(AddressContext);
  const [loading, setLoading] = useState(false);

  const handleRemoveAddress = async (addressId) => {
    setLoading(true);
    try {
      if (currentUser) {
       const updatedAddresses= await removeAddress(currentUser,addressId);
      
        setAddresses(updatedAddresses);
        toast.success("Address removed successfully!", {
          autoClose: 1500,
        });
      } else {
        toast.warn("Please try again!", { autoClose: 1500 });
      }
    } catch (error) {
      toast.error("Error removing address!", { autoClose: 1500 });
    } finally {
      setLoading(false);
    }
  };
  console.log("Current User",currentUser)
  console.log(addresses.addresses)
  return (
    <>
      {addresses.addresses  ? (
        <div className="address-content">
          <div
            className="address-first-di"
            style={{ cursor: "pointer" }}
            onClick={toggleAddressPage}
          >
            <IoMdAdd />
            <h2>Add new address</h2>
          </div>
          {addresses.addresses.map((address) => (
            <div key={address._id} className="address-first-div">
              <p>{`${address.firstName},${address.lastName},${address.phoneNumber},${currentUser.data.data.societyName},${address.city},${address.zipCode},${address.state}`}</p>
              <button
                onClick={() => handleRemoveAddress(address._id)}
                className="address-remove-btn"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <AddressPage />
      )}
    </>
  );
};



const AddressPage = ({ handleAddressAdded }) => {
    const { currentUser } = useAuth();
  const { addresses, setAddresses } = useContext(AddressContext);
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
    if (!fullAddress.trim()) newErrors.fullAddress = "Please enter your full address.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddAddress = async () => {
    if (!validateFields()) return;

    setLoading(true);
  const userId = currentUser.data.data._id;
    const newAddress = {
          firstName,
          lastName,
          phoneNumber,
          country,
          state,
          zipCode,
          city,
          fullAddress,
        }
      

    try {
      // Assuming saveAddress is your API call to save data
      const savedAddress = await addAddress(userId,newAddress);
      setAddresses([...addresses, savedAddress]);

      // Reset form fields
      setFirstName("");
      setLastName("");
      setPhoneNumber("");
      setCountry("");
      setState("");
      setZipCode("");
      setCity("");
      setFullAddress("");

      toast.success("Address added successfully!", { autoClose: 1500 });
      handleAddressAdded();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save address. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="address-main">
      <div>
        <h1 style={{ fontSize: "25px" }}>Add a New Address</h1>
      </div>
      <div className="address-main-first">
        <div>
          <label>First Name</label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {errors.firstName && <p style={{ color: "red" }}>{errors.firstName}</p>}
        </div>
        <div>
          <label>Last Name</label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {errors.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}
        </div>
        <div>
          <label>Phone Number</label>
          <input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {errors.phoneNumber && <p style={{ color: "red" }}>{errors.phoneNumber}</p>}
        </div>
        <div>
          <label>Country</label>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          {errors.country && <p style={{ color: "red" }}>{errors.country}</p>}
        </div>
        <div>
          <label>State</label>
          <input
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          {errors.state && <p style={{ color: "red" }}>{errors.state}</p>}
        </div>
        <div>
          <label>Zip Code</label>
          <input
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
          {errors.zipCode && <p style={{ color: "red" }}>{errors.zipCode}</p>}
        </div>
        <div>
          <label>City</label>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          {errors.city && <p style={{ color: "red" }}>{errors.city}</p>}
        </div>
        <div>
          <label>Full Address</label>
          <textarea
            value={fullAddress}
            onChange={(e) => setFullAddress(e.target.value)}
          />
          {errors.fullAddress && (
            <p style={{ color: "red" }}>{errors.fullAddress}</p>
          )}
        </div>
      </div>
      <div className="address-button">
        <button onClick={handleAddAddress}>Add Address</button>
      </div>
    </div>
  );
};


export const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
    const { currentUser } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAddress = async () => {
      if (currentUser) {
        try {
          const addresses = await getAddress(currentUser.data.data._id);
          setAddresses(addresses);
          setLoading(false);
        } catch (error) {
          toast.error("Error fetching user address!", { autoClose: 1500 });
          setLoading(false);
        }
      }
    };
    fetchUserAddress();
  }, [currentUser]);

  return (
    <AddressContext.Provider value={{ addresses, setAddresses, loading }}>
      {children}
    </AddressContext.Provider>
  );
};

export default Address;