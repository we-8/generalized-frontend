import { Herobanner2 ,ProductSection} from "@/components";
import { Products_banner } from "@/assets";
import React,{useState} from "react";
import '../../styles/main-pages-css/ProductPage.css';

const Product = () => {
  
  return (
    <div className="app__product--main-div">
      <div>
      <Herobanner2 backgroundImage={Products_banner} title="Our Products" description="Your Favorite Sri Lankan Dishes, Packed Fresh and Delivered Anywhere" />
      </div>
      <div>
        <ProductSection/>
      </div>
      
    </div>
  )
}

export default Product;