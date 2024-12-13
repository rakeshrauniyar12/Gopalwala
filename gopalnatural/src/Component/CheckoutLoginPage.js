import React,{useState,useEffect} from "react";
import { useNavigate,useLocation, Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { getAddress,addAddress,registerUser,
  loginUser } from "../backend";
import { toast } from "react-toastify";
import { RiArrowDropDownLine } from "react-icons/ri";

const CheckoutLoginPage = ({ onRefresh }) => {
  const isMobile = window.innerWidth<=768;
  const { currentUser,isLoggedIn,login } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [flatNumber, setFlatNumber] = useState("");
  const [towerNumber, setTowerNumber] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRotated, setIsRotated] = useState(false);
  const [showSociety, setShowSociety] = useState(false);
  const [societyName,setShowSocietyName]= useState("Select Society Name")
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
    if (!email.trim()) newErrors.email = "Please enter email.";
    if (!password.trim()) newErrors.password = "Please enter password.";
    if (societyName==="Select Society Name".trim()) newErrors.societyName = "Please select society name.";

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

  const handleRotate = () => {
    setIsRotated((prev) => !prev);
  };

  
  const handleShowSociety = () => {
    setShowSociety((prev) => !prev);
  };

  const handleSocietySelect = (society) => {
    setShowSocietyName(society)
    setShowSociety(false);
    setIsRotated(false);
  };

  const handleAddAddress = async () => {
    if(!isLoggedIn){
     const userData= await registerUser(email, password, societyName);
     console.log(userData)
     if(userData){
      const loginRes=await loginUser(email,password);
      console.log("LoginRes Full",loginRes)
              login(loginRes.data.token,loginRes.data.user._id)
         if(loginRes){
          if (!validateFields()) return;
          if(addresses){
            if(addresses.length>=5){
              toast.warn("Please remove one to add this address!")
              return ;
            }
          }
          setLoading(true);
         
          const userId = loginRes.data.user._id;
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
            setEmail("");
            setPassword("");
            toast.success("Address added successfully!", { autoClose: 1500 });
            onRefresh();
            // Update address list in AddressContent
          } catch (error) {
            console.error("Error saving address:", error);
            toast.error("Failed to save address. Please try again.");
          } finally {
            setLoading(false);
          }  
         }
          else{
          toast.error("Facing some error!")
         }

     }

    }
    else{
   // if (!validateFields()) return;
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
      onRefresh();
      // Update address list in AddressContent
    } catch (error) {
      console.error("Error saving address:", error);
      toast.error("Failed to save address. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  };
 const paths="/checkout"
  return (
    <div className="address-main" style={{width:"100%"}}>
     { !isLoggedIn?<div style={{ marginTop: "30px" }}>
        <h1 style={{ fontSize: "25px" }}>Shipping Information</h1>
        <div style={{display:"flex"}}>
          <p>Already have an account?</p>
          <Link to={"/login"}>Login</Link>
        </div>
      </div>:""}
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
         { !isLoggedIn?
         <>
         <div>
            <input
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          </div>
          <div>
            <input
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
          </div>
          </>
          :""}
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
          <div>
          <div className="select-society" style={{marginTop:"0px",height:"46px",width:"90%"}}>
            <p>{societyName ? `${societyName}` : "Select Your Society"}</p>
            <div
              className="society-selection-box"
              onClick={() => {
                handleRotate();
                handleShowSociety();
              }}
            >
              <RiArrowDropDownLine
                style={{
                  fontSize: "60px",
                  transform: isRotated ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                  cursor: "pointer",
                }}
              />
            </div>
          
          </div>
          {errors.societyName && <p style={{ color: "red" }}>{errors.societyName}</p>}
          </div>
        

         
        </div>
        {showSociety && (
            <div className="society-dropdown" style={{
              width:!isMobile?"30%":"75%",
              margin:"auto"}}>
              {[
                "Select Your Society",
                 "OUCOLONY",
                 "OUTEMPLE",
                 "WESTERN PLAZA",
                 "MANIKONDA",
                 "PUPPALAGUDA",
                 "KHAJAGUDA",
                 "AYYAPPA SOCIETY",
                 "KOKAPET",
                 "APARNA CYBERZON",
                 "APARNA CYBERLIFE",
                 "APARNA SAROVAR ZENITH",
                 "APARNA SERENE PARK",
                 "APARNA CYBERSCAPE",
                 "APARNA LUXOR PARK",
                 "APARNA KANOPY MARIGOLD",
                 "APARNA SERENITY",
                "Tata Promont",
                "Sobha Neopolis",
                "Embassy Lake",
                "Felicity Engrace",
                "Sattva Aeropolis",
                "Suncity",
                "Grey Stone",
              ].map((society) => (
                <p
                  key={society}
                  onClick={() => handleSocietySelect(society)}
                  style={{ cursor: "pointer" }}
                >
                  {society}
                </p>
              ))}
            </div>
          )}
        {/* <div className="checkout-area">
          <textarea
            placeholder="Enter Address"
            value={fullAddress}
            onChange={(e) => setFullAddress(e.target.value)}
          />
          {errors.fullAddress && <p style={{ color: "red" }}>{errors.fullAddress}</p>}
        </div> */}
      </div>
      <div className="check-ship-btn">
        <button onClick={handleAddAddress} disabled={loading} className="add-addres">
          {loading ? "Saving..." : "Add Shipping Info"}
        </button>
      </div>
    </div>
  );
  };

  export default CheckoutLoginPage;