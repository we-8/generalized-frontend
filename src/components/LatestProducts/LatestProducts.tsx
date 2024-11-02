'use client'
import '../../styles/components-css/LatestProducts.css';
import { test3 } from '@/assets';
import { TitleL } from '../Title/Title';
import { OrderNow2 } from '../CommonButtons/CommonButtons';
import React,{ useRef } from 'react';
import Image from 'next/image';
import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const LatestProducts = () => {
  const sliderRef = useRef<Slider | null>(null); 
  const products = [
    { productName: 'Cashews', new_price: 'Rs 2450', description: 'A dialog is a 23234 32432 dfdgfg  gfgdfgdf gdfg fd  type of modal window that appears in front of app content to provide critical information, or prompt for a decision to be made...', image: test3 },
    { productName: 'Almonds', new_price: 'Rs 3500', description: 'A dialog is a type of modal window that appears in front of app content to provide critical information, or prompt for a decision to be made...', image: test3 },
    { productName: 'Almonds1', new_price: 'Rs 3500',description: 'A dialog is a type of modal  gdfg dgfdgdfgfdg dfgfd gdf gdfg gdfg window that appears in front of app content to provide critical information, or prompt for a decision to be made...', image: test3 },
    { productName: 'Almonds2', new_price: 'Rs 3500', description: 'A dialog is a type of modal window that appears in front of app content to provide critical information, or prompt for a decision to be made...', image: test3 },
    { productName: 'Almonds3', new_price: 'Rs 3500', description: 'Apearovide critical information, or prompt for a decision to be made...', image: test3 },
  
  ];

  const settings = {
    infinite: true,
    speed: 500,
    arrows:false,
    slidesToShow: 3,
    slidesToScroll: 2,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1440, settings: { slidesToShow: 2, slidesToScroll: 2, infinite: true,initialSlide: 1  }},
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 2, infinite: true ,initialSlide: 1} },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1, initialSlide: 1 }},
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1, initialSlide: 1 }},
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 ,initialSlide: 1}},
    ],
  };

  return (
    <div className='app__latestProducts--main-div'>
      <TitleL title="What's New"/>
      <button className='prev-buttonL' onClick={() => sliderRef.current?.slickPrev()}><IoIosArrowBack color="red" fontWeight={600} size={40}/></button>
      <Slider ref={sliderRef} {...settings}>
        {products.map((product, index) => (
          <div className='app__latestProduct--item-div' key={index}>
            <div className='item__card'>
              <Image className='product-image' src={product.image} alt="new product image" />
              <p className='static__p'>{product.productName}</p>
              <div className='static__div'>
                <p className='static__div-title'>{product.productName}</p>
                <p className='static__div-description'>{product.description.length>140 ? (product.description.slice(0,140)+'...'):(product.description)}</p>
                <p className='static__div-price'>{product.new_price}</p>
                <OrderNow2 title='Order Now'/>
              </div>
            </div>
          </div>
          
        ))}
      </Slider>
      <button className='next-buttonL' onClick={() => sliderRef.current?.slickNext()}><IoIosArrowForward color="red" fontWeight={600} size={40}/></button>

    </div>
  )
}

export default LatestProducts;