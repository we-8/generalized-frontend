'use client';
import React, { useRef } from 'react';
import '../../styles/components-css/SpecialOffer.css';
import { test2 } from '@/assets';
import Image from 'next/image';
import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";
import { OrderNow } from '../CommonButtons/CommonButtons';
import {TitleL} from '@/components';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const SpecialOffers = () => {
  const sliderRef = useRef<Slider | null>(null); 

  const products = [
    { productName: 'Cashews', new_price: '2450', old_price: '3000', image: test2 },
    { productName: 'Almonds', new_price: '3500', old_price: '4000', image: test2 },
    { productName: 'Almonds1', new_price: '3500', old_price: '4000', image: test2 },
    { productName: 'Almonds2', new_price: '3500', old_price: '4000', image: test2 },
    { productName: 'Almonds3', new_price: '3500', old_price: '4000', image: test2 },
  
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
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1, initialSlide: 1 }},
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 ,initialSlide: 1}},
    ],
  };

  return (
    <div className="app__specialOffer--main-div">
      <TitleL title='Special Offers'/>
      <button className='prev-button' onClick={() => sliderRef.current?.slickPrev()}><IoIosArrowBack color="red" fontWeight={600} size={40}/></button>
      <Slider ref={sliderRef} {...settings}>
        {products.map((product, index) => (
          <div className="app__specialOffer--item-div" key={index}>
             <div className='item-inside'>
             <p className='offer-title'>{product.productName}</p>
              <div className='offer-details'>
                <div className='offer-prices'>
                  <p className='offer-oldprice'><del>Rs {product.old_price}</del></p>
                  <p className='offer-newprice'>Rs {product.new_price}</p>
                  <OrderNow title="ORDER NOW"/>
                </div>
                <div className="app__specialOffer-img">
                  <Image className="specialOffer-image" src={product.image} alt="special offer image" />
                </div>
              </div>
             </div>
              
            
            
          </div>
        ))}
      </Slider>
      <button className='next-button' onClick={() => sliderRef.current?.slickNext()}><IoIosArrowForward color="red" fontWeight={600} size={40}/></button>
    </div>
  );
};

export default SpecialOffers;
