import { Herobanner2 ,ProductSection} from "@/components";
import { Products_banner } from "@/assets";
import React,{useState} from "react";
import '../../styles/main-pages-css/ProductPage.css';

const Product = () => {
  
  return (
    <div className="app__product--main-div">
      <div>
      <Herobanner2 backgroundImage={Products_banner} title="Our Products" description="Body text for your whole article or post. We’ll put in some lorem ipsum to show how a filled-out page might look:" />
      </div>
      <div>
        <ProductSection/>
      </div>
      
    </div>
  )
}

export default Product;