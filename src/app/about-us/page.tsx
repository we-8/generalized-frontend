import { Herobanner2, TitleR,TitleL ,DescriptionL,DescriptionR } from "@/components";
import Image from "next/image";
import { hero2 ,test3,Quote } from "@/assets";
import '../../styles/main-pages-css/AboutUs.css';

const AboutUs = ()=> {
  return (
      <div className="app__aboutUs--main-div">
        <div>
          <Herobanner2 backgroundImage={hero2} title="About Us" description="Body text for your whole article or post. We’ll put in some lorem ipsum to show how a filled-out page might look:" />
        </div>

        <div className="app__aboutUs--theStory-section section__padding">
          <Image className="story-section-image" src={test3} alt="our story image" />
          <div className="app__aboutUs--theStory-details">
            <div className="story-section-line"/>
            <TitleL title="The Story" />
            <DescriptionL description="Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate Content. Qui  international first-class nulla ut. Punctual adipisicing, essential lovely queen tempor eiusmod irure. Exclusive izakaya charming Scandinavian impeccable aute quality of life soft power pariatur Melbourne occaecat discerning. Qui wardrobe aliquip, et Porter destination Toto remarkable officia Helsinki excepteur Basset hound. Zürich sleepy perfect consectetur."/>
          </div>
        </div>
        <div className="app__aboutUs-quote-section section__padding">
          <Image className="quote-section-image" src={Quote} alt="quote" />
          <p className="quote_p">Every journey begins with a single step and a good snack ...</p>
          <div className="quote-section-line" />
        </div>
        
      </div>  
  );
}

export default AboutUs