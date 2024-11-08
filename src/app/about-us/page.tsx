import { Herobanner2 } from "@/components";
import { hero2 } from "@/assets";
import Image from "next/image";
import { Title, Description,DescriptionRight } from "@/components";
import { who } from "@/assets";
import '../../styles/main-pages-css/AboutUs.css';

const AboutUs = () => {
  return (
    <div className="app__AboutUs--main-div">
      <div>
        <Herobanner2 
          backgroundImage={hero2} 
          title="About Us" 
          description="Body text for your whole article or post. We’ll put in some lorem ipsum to show how a filled-out page might look:"
        />
      </div>

      <div className="app__Aboutus--Who-we-are section__padding">
        <div className="app__Aboutus--Who-we-are-details">
          <Title title="Who we are" />
          <DescriptionRight description="Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate Content. Qui international first-class nulla ut. Punctual adipisicing, essential lovely queen tempor eiusmod irure. Exclusive izakaya charming Scandinavian impeccable aute quality of life soft power pariatur Melbourne occaecat discerning. Qui wardrobe aliquip, et Porter destination Toto remarkable officia Helsinki excepteur Basset hound. Zürich sleepy perfect consectetur." />
        </div>
        <Image className="who-image" src={who} alt="About Us" />
      </div>
      

      <div className="aboutUs__section_left">
        <Image className="aboutUs__image_left" src={who} alt="About Us" />
        <div className="aboutUs__text_left">
          <Title title="Who we are" />
          <DescriptionRight description="Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate Content. Qui international first-class nulla ut. Punctual adipisicing, essential lovely queen tempor eiusmod irure. Exclusive izakaya charming Scandinavian impeccable aute quality of life soft power pariatur Melbourne occaecat discerning. Qui wardrobe aliquip, et Porter destination Toto remarkable officia Helsinki excepteur Basset hound. Zürich sleepy perfect consectetur." />
        </div>
      </div>

    </div>
  );
};

export default AboutUs;
