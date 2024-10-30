import { Herobanner2 } from "@/components";
import { hero4 } from "@/assets";

const ContactUs= () => {
  return (
    <div className="app__contactUs--main-div">
      <div>
      <Herobanner2 backgroundImage={hero4} title="Contact Us" description="Body text for your whole article or post. We’ll put in some lorem ipsum to show how a filled-out page might look:" />
      </div>s
    </div>
  )
}

export default ContactUs;