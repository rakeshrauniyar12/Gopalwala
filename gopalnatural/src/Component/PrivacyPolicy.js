import React from "react";
import { TbMessageReportFilled } from "react-icons/tb";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaCookieBite } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa";
import { IoHandRightSharp } from "react-icons/io5";
import { RiLinksLine } from "react-icons/ri";
import { MdPrivacyTip } from "react-icons/md";
import { SiWondersharefilmora } from "react-icons/si";
import { MdOutlineAttachFile } from "react-icons/md";
import "../Style/Privacy.css"
const PrivacyPolicy = ()=>{
    return (
        <div className="privacy-container">
            <div className="aboutus-border"></div>
              <div className="first-section">
                <div>
              <h1 className="f-h1" style={{color:"#05456c"}}>Privacy <span>Policy</span></h1>
              <p style={{fontSize:"12px",textAlign:"center"}}>
               Last Updated 28/10/2024
              </p>
              </div>
              <div>
                <p>
                At Genuine Auto Electrical Service, we are committed to safeguarding your privacy. This Privacy Policy explains how we collect, use, and protect your personal information. By using our website or services, you agree to the terms outlined in this policy.
                </p>
              </div>
              </div>
               <div className="privacy-first-cont">
                <div className="privacy-first-first">
                    <div>
                <TbMessageReportFilled style={{fontSize:"30px",color:"#05456c"}}/>
                </div>
                <div>
                  <h1 className="p-h1">1. Information we collect</h1>
                  <p className="p-span1">We may collect various types of information, including:</p>
                  <p className="p-span1">Personal Information:</p>
                  <p className="pr-p">Name, contact details (such as email address, phone number), and billing information.</p>
                  <p className="p-span1">Technical Data:</p>
                  <p>IP address, browser type, operating system, and usage data to help us improve website functionality and user experience.</p>
                  <p className="p-span1">Service Information: </p>
                  <p>Details related to your vehicle, service history, and feedback on our services.</p>
                </div>
                </div>
              
               <div className="privacy-first-second">
                <div>
               <IoMdInformationCircleOutline style={{fontSize:"30px",color:"#05456c"}}/>
               </div>
               <div>
                <h1 className="p-h1">2. How We Use Your Informationt</h1>
                <p className="p-span1">We use your information to:</p>
                <p>Provide, operate, and maintain our services.</p>
                <p>Process transactions and provide customer support.</p>
                <p>Send you service-related communications, including updates and promotions.</p>
                <p>Analyze website usage and optimize our content to improve customer experience.</p>
                </div>
                </div>


                <div className="privacy-first-first">
                    <div>
                    <SiWondersharefilmora style={{fontSize:"30px",color:"#05456c"}}/>
                </div>
                <div>
               
                  <h1 className="p-h1">3. Data Sharing and Disclosure</h1>
                  <p className="p-span1">Your information will only be shared:</p>
                  
              <ul style={{marginLeft:"25px"}}>
                    <li>With third-party providers who assist us in service delivery (e.g., payment processors, couriers).</li>
                    <li>When required by law, to protect rights and safety, or as part of a business transaction, such as a merger.</li>
                  
                   </ul>
                  <p>We never sell or rent your personal information to third parties.
                  </p>
                </div>
                </div>
              
               <div className="privacy-first-second">
                <div>
                <FaCookieBite style={{fontSize:"30px",color:"#05456c"}}/>
               </div>
               <div>
                <h1 className="p-h1">4. Cookies and Tracking</h1>
               <ul style={{marginLeft:"25px"}}>
                <li>
                We use cookies and similar tracking technologies to enhance your experience on our website. These help us remember your preferences and track site usage. You may disable cookies through your browser, though some site features may be limited as a result.
                </li>
               </ul>
                </div>
                </div>

                <div className="privacy-first-second">
                <div>
                <FaDatabase style={{fontSize:"30px",color:"#05456c"}}/>
               </div>
               <div>
                <h1 className="p-h1">5. Data Security</h1>
               <ul style={{marginLeft:"25px"}}>
                <li>
                We implement industry-standard security measures to protect your information. However, please note that no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                </li>
               </ul>
                </div>
                </div>

                <div className="privacy-first-first">
                    <div>
                    <IoHandRightSharp style={{fontSize:"30px",color:"#05456c"}}/>
                </div>
                <div>
               
                  <h1 className="p-h1">6. Your Rights</h1>
                  <p className="p-span1">You have the right to:</p>
             <ul style={{marginLeft:"25px"}}>
                    <li>Access, update, or delete your personal information.</li>
                    <li>Withdraw consent to data processing where consent is required.</li>
                    <li>File a complaint with a data protection authority if you believe your rights have been violated.</li>
                  
                   </ul>
                  
                </div>
                </div>

                <div className="privacy-first-second">
                <div>
                <RiLinksLine style={{fontSize:"30px",color:"#05456c"}}/>
               </div>
               <div>
               

                <h1 className="p-h1">7. Link to other sites</h1>
               <ul style={{marginLeft:"25px"}}>
                <li>
                Our website may contain links to third-party websites. We are not responsible for the content or privacy practices of these external sites. We encourage you to review their privacy policies independently.
                </li>
               </ul>
                </div>
                </div>

                <div className="privacy-first-second">
                <div>
                <MdPrivacyTip  style={{fontSize:"30px",color:"#05456c"}}/>
               </div>
               <div>
                <h1 className="p-h1">8. Changes to Our Privacy Policy</h1>
               <ul style={{marginLeft:"25px"}}>
                <li>
                We may update this Privacy Policy periodically. Any changes will be posted on this page, with the “Last Updated” date adjusted accordingly.

                </li>
               </ul>
                </div>
                </div>
              </div>
              
              <h1 style={{textAlign:"center",color:"#05456c",marginTop:"20px"}}>Contact <span>Us</span></h1>
          
           <div className="contact-details">
            <p style={{fontSize:"14px",fontWeight:"600"}}>For questions or concerns about this Privacy Policy, please contact us:
            </p>
            <div>
            <div className="fixe-details1">
              <div><p>Phone:</p></div>
              <div><p> +91 9986179080</p></div>
            </div>
            <div className="fixe-details2">
           <div><p>Email:</p></div>
           <div><p>genuineautobosch@gmail.com</p></div>
            </div>
            <div>
                <div><p>Address:</p></div>
                <div><p>5/9, 5th Cross, LBF Road, Behind Lion's Eye Hospital, Doddanna Layout, Bengaluru-560004</p></div>
            </div>
            </div>
           </div>
           
          
            

        </div>
    )
}

export default PrivacyPolicy;