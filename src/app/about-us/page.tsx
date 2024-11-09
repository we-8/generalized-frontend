import { Herobanner2, TitleR,TitleL } from "@/components";
import Image from "next/image";
import { hero2 ,test2 } from "@/assets";

const AboutUs = ()=> {
  return (
      <div className="app__aboutUs--main-div">
        <div>
          <Herobanner2 backgroundImage={hero2} title="About Us" description="Body text for your whole article or post. We’ll put in some lorem ipsum to show how a filled-out page might look:" />
        </div>

        <div className="app__aboutUs--theStory-section">
          <Image src={test2} alt="our story image" />
          <div className="app__aboutUs--theStory-details">
            <div/>

          </div>
        </div>
        
      </div>  
  );
}

export default AboutUs