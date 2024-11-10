import { Herobanner2 } from "@/components";
import { useState } from "react";
import { hero4 } from "@/assets";
import { FaLocationDot , FaPhone} from "react-icons/fa6";
import { BsGlobe } from "react-icons/bs";
import '../../styles/main-pages-css/ContactUs.css'
import ContactUsForm from "@/components/ContactUsForm/ContactUsForm";


const ContactUs= () => {

  const details =[
    {
      type:'Address',
      value:'S.K CINEMA BUILDING,Matara 8100'
    },
    {
      type:'E-mail',
      value:'ceylonrichproducts@gmail.com'
    },
    {
      type:'Phone',
      value:'070 218 2114'
    }
  ]
  return (
    <div className="app__contactUs--main-div">
      <div>
      <Herobanner2 backgroundImage={hero4} title="Contact Us" description="Body text for your whole article or post. We’ll put in some lorem ipsum to show how a filled-out page might look:" />
      </div>
      <ContactUsForm/>
      <div className="app__contactUs--details-div">
        <div className="app_contactUs-details-section">
          {details.map((details,index)=>(
            <div className="details-item" key={index}>
              <div className="details-icon">
                {details.type === 'Address' && <FaLocationDot color="#AD49E1" fontSize={45}  />}
                {details.type === 'E-mail' && <BsGlobe color="#AD49E1" fontSize={45}   />}
                {details.type === 'Phone' && <FaPhone color="#AD49E1" fontSize={45} />}
              </div>
              <div className="details-values">
                <p className="details-type">{details.type}</p>
                <p className="details-type-value">{details.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContactUs;