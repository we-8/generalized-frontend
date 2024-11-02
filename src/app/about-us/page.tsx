import { Herobanner2 } from "@/components";
import { hero2 } from "@/assets";

const AboutUs = ()=> {
  return (
      <div className="app__aboutUs--main-div">
        <div>
          <Herobanner2 backgroundImage={hero2} title="About Us" description="Body text for your whole article or post. We’ll put in some lorem ipsum to show how a filled-out page might look:" />
        </div>
        <div>fdghfh</div>
      </div>  
  );
}

export default AboutUs