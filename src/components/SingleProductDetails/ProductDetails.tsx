"use client";
import Image from "next/image";
import { testImage } from "@/assets";
import "./ProductDetails.css";
import { useState } from "react";

const ProductDetails: React.FC = () => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="app__singleproduct-main-div">
      <div className="app__singleproduct-img-div">
        <Image
          className="app__single-product-img"
          src={testImage}
          alt="picture"
          width={600}
          height={1200}
        />
      </div>
      <div className="app__singleproduct-details-div">
        <div className="app__singleproduct-productname-div">
          <h1>Spicy Cashew Nutty Flavour</h1>
        </div>
        <div className="app__singleproduct-productdetails-div">
          <p>
            Excepteur efficient emerging, minim veniam anim aute carefully
            curated Ginza conversation exquisite perfect nostrud nisi intricate
            Content. Product Details: Exclusively handmade, No artificial
            flavors.
          </p>
        </div>
        <div className="app__singleproduct-price-div">
          <p>Rs.2500</p>
        </div>
        <div className="app__singleproduct-features-div">
          <div className="app__singleproduct-features-items-div">
            <p>Availability: 10 in stock</p>
          </div>
          <div className="app__singleproduct-features-items-div">
            <p>Weight: 0.75lbs</p>
          </div>
        </div>
        <div className="app__singleproduct-quantity-addtocart-div">
          <div className="quantity-selector">
            <button className="decrement" onClick={decrement}>
              -
            </button>
            <span className="quantity">{quantity}</span>
            <button className="increment" onClick={increment}>
              +
            </button>
          </div>
          <div className="app__singleproduct-button-div">
            <button className="app__singleproduct-button">Add To Cart</button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
