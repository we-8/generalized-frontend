import { Herobanner2 } from "@/components";
import { hero3 } from "@/assets";

const Product = () => {
  return (
    <div className="app__product--main-div">
      <div>
      <Herobanner2 backgroundImage={hero3} title="Our Products" description="Body text for your whole article or post. We’ll put in some lorem ipsum to show how a filled-out page might look:" />
      </div>
    </div>
  )
}

export default Product;