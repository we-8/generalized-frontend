import { Herobanner2, TitleL, DescriptionL } from "@/components";
import { Contact_us_banner } from "@/assets";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { BsGlobe } from "react-icons/bs";
import "../../styles/main-pages-css/ContactUs.css";
import ContactUsForm from "@/components/ContactUsForm/ContactUsForm";

import Image from "next/image";
import { our_story } from "@/assets";
import "../../styles/main-pages-css/AboutUs.css";

const ContactUs = () => {
  const details = [
    {
      type: "Address",
      value: "S.K CINEMA BUILDING,Matara 8100",
    },
    {
      type: "E-mail",
      value: "ceylonrichproducts@gmail.com",
    },
    {
      type: "Phone",
      value: "070 218 2114",
    },
  ];
  return (
    <div className="app__contactUs--main-div">
      <div>
        <Herobanner2
          backgroundImage={Contact_us_banner}
          title="Contact Us"
          description="Body text for your whole article or post. We’ll put in some lorem ipsum to show how a filled-out page might look:"
        />
      </div>

      <div className="app__contactUs--details-div">
        <div className="app_contactUs-details-section">
          {details.map((details, index) => (
            <div className="details-item" key={index}>
              <div className="details-icon">
                {details.type === "Address" && (
                  <FaLocationDot color="#FFCF2C" fontSize={45} />
                )}
                {details.type === "E-mail" && (
                  <BsGlobe color="#FFCF2C" fontSize={45} />
                )}
                {details.type === "Phone" && (
                  <FaPhone color="#FFCF2C" fontSize={45} />
                )}
              </div>
              <div className="details-values">
                <p className="details-type">{details.type}</p>
                <p className="details-type-value">{details.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="app__aboutUs--theStory-section section__padding">
        <Image
          className="story-section-image"
          src={our_story}
          alt="our story image"
        />
        <div className="app__aboutUs--theStory-details">
          <div className="story-section-line" />
          <TitleL title="We’d Love to Hear From You" />
          <DescriptionL
            description={
              <div>
                <p style={{ textAlign: "justify" }}>
                  Have a question? A special request? Or just want to say hello?
                  We’re always happy to connect.
                </p>
                <p style={{ textAlign: "justify" }}>
                  At Ceylon Rich Products, we believe in real people and real
                  conversations. No automated replies. No long waits. Just
                  friendly support from a team that truly cares.
                </p>
                <p style={{ textAlign: "justify" }}>
                  Here’s how you can get in touch:
                </p>

                <ul
                  style={{
                    paddingLeft: "1.5em",
                    listStyleType: "disc",
                    textAlign: "left",
                  }}
                >
                  <li style={{ marginBottom: "0.8em" }}>
                    A <strong>contact form</strong> that sends submissions to
                    your email
                  </li>
                  <li style={{ marginBottom: "0.8em" }}>
                    A <strong>WhatsApp button</strong> that opens a direct chat
                  </li>
                </ul>

                <p style={{ textAlign: "justify" }}>
                  Whether you’re ordering from overseas or right here in Sri
                  Lanka, we’re here to assist you every step of the way.
                </p>
              </div>
            }
          />
        </div>
      </div>

      <div>
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactUs;
