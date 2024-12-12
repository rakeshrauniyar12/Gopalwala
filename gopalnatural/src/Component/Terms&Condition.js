import React from "react";
import "../Style/Privacy.css"
import "../Style/Term&Condition.css"
import { MdOutlineAttachFile } from "react-icons/md";


const TermAndCondition = ()=>{
    return(
        <div className="term-main-container">
              <div className="aboutus-border"></div>
             <div className="first-section">
                <div>
              <h1 className="f-h1" style={{color:"#05456c"}}>Terms of <span>Service</span></h1>
              <p style={{fontSize:"12px",textAlign:"center"}}>
               Last Updated 28/10/2024
              </p>
              </div>
              <div>
                <p>
                These Terms of Service ("Terms") govern your use of the website and services provided by Genuine Auto Electrical Service. By accessing or using our website and services, you agree to comply with these Terms. If you do not agree, please discontinue use of our services.

                </p>
              </div>
              </div>

              <div className="term-content">
                <div>
                    <h1>1. Services</h1>
                    <p>Genuine Auto Electrical Service provides automotive electrical repair and maintenance services, including diagnostics, repairs, and replacements. Our services are provided subject to availability and may vary by location.
                    </p>
                </div>
                <div>
                    <h1>2. User Responsibilities</h1>
                    <p>When using our website or services, you agree to:
                <ul style={{marginLeft:"60px"}}>
                            <li>Provide accurate and up-to-date information.</li>
                            <li>Use our services for lawful purposes only.</li>
                            <li>Refrain from any actions that may harm or interfere with our website, services, or other users.</li>
                        </ul>
                    </p>
                </div>

                <div>
                    <h1>3. Service Appointments and Cancellations</h1>
                    <p>We strive to offer prompt and reliable service. However, appointments are subject to availability and may need rescheduling. If you need to cancel or reschedule, please notify us at least 24 hours in advance.
                      </p>
                </div>

                <div>
                    <h1>4. Payment Terms</h1>
                    <p>Payments for services are due upon receipt of an invoice, unless otherwise agreed. We accept payments via [list payment methods, e.g., cash, credit card, online payment systems]. Late payments may result in additional fees or suspension of services.

                      </p>
                </div>

                <div>
                    <h1>5. Warranty and Liability</h1>
                    <p>Service Warranty:</p>
                    <ul style={{marginLeft:"60px"}}>
                        <li>We offer a limited warranty on specific services and parts, which will be disclosed at the time of service. This warranty does not cover issues arising from misuse, unauthorized modifications, or failure to maintain the vehicle.
                        </li>
                        <li>Our website and services are provided "as-is." While we strive for accuracy, we do not guarantee that the information on our website is error-free or that our services will meet all individual requirements.
                        </li>
                    </ul>

                    <p>Limitation of Liability:</p>
                    <ul style={{marginLeft:"60px"}}>
                        <li>Genuine Auto Electrical Service shall not be liable for any indirect, incidental, or consequential damages resulting from the use of our website or services
                        </li>
                    </ul>
                </div>

                <div>
                    <h1>6. Intellectual Property</h1>
                    <p>All content on this website, including text, graphics, logos, and images, is the property of Genuine Auto Electrical Service. Unauthorized use or reproduction is prohibited without written permission.
                    </p>
                  
                </div>

                <div>
                    <h1>7. Privacy Policy</h1>
                    <p>Our Privacy Policy governs the collection, use, and protection of your personal information. By using our website, you agree to the practices described in our Privacy Policy.

                    </p>
                  
                </div>

                <div>
                    <h1>8. Changes to Terms of Service</h1>
                    <p>We may update these Terms periodically. Continued use of our services constitutes acceptance of any revised Terms.


                    </p>
                  
                </div>

                
                <div>
                    <h1>9. Governing Law</h1>
                    <p>These Terms shall be governed by and interpreted in accordance with the laws of [your jurisdiction, e.g., the State of Karnataka, India].
                 </p>
                  
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
          <div><p> genuineautobosch@gmail.com</p></div>
           </div>
           <div>
               <div><p>Address:</p></div>
               <div><p> 5/9, 5th Cross, LBF Road, Behind Lion's Eye Hospital, Doddanna Layout, Bengaluru-560004</p></div>
           </div>
           </div>
          </div>
          
    
           
        </div>
    )
}


export default TermAndCondition;