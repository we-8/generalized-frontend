"use client";
import Image from "next/image";
import { testImage,Cashew } from "@/assets";
import "./ProductDetails.css";
import { useState } from "react";
import { features } from "process";

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
  const productlist =[
    {
        img:Cashew,
        title:'Spicy Cashew Nutty Flavoured',
        description:'Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate Content. .',
        features:['Exclusively handmade','No artificial flavors','Product Details','Weight 0.75lbs'],
        price:'2500.00',
        qty:'10',
        Availabilty:'in stock'
    }
  ]       
  return (
    <div className="app__singleproduct-main-div">
      {
        productlist.map((item,index)=>(
          <>
            <div key={index} className="app__singleproduct-img-div">
          <Image
            className="app__single-product-img"
            src={item.img}
            alt="picture"
            width={600}
            height={1200}
          />
        </div>
        <div className="app__singleproduct-details-div">
          <div className="app__singleproduct-productname-div">
            <h1>{item.title}</h1>
          </div>
          <div className="app__singleproduct-productdetails-div">
            <p>
              {item.description}
            </p>
          </div>
          <div className="app__singleproduct-productdetails-features">
            {item.features.map((feature,indexkey)=>(
              <p key={indexkey}>{feature}</p>
            ))}
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
          </>
        ))
      }
    </div>
  );
};

export default ProductDetails;
