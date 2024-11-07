'use client'
import '../../styles/components-css/PeopleReview.css'
import Image from 'next/image';
import React,{ useRef } from 'react';
import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";
import { IoStarSharp } from "react-icons/io5";
import { person } from '@/assets';
import { TitleL } from '../Title/Title';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


const PeopleReview = () => {

  const sliderRef = useRef<Slider | null>(null); 
  const reviews = [
    { productName: 'Cashews',name: 'John Doe', description: 'A dialog is a type of modal window that appears in front of app content to provide critical information, or prompt for a decision to be made', image: person , date:'2024/04/23' ,starRating:4 },
    { productName: 'Almonds',name: 'John Doe', description: 'A dia to provide critical information, or prompt for a decision to be made', image: person , date:'2024/04/23',starRating:3 },
    { productName: 'Almonds1',name: 'John Doe',description: 'A dialog is a type of modal window that appears in front of app content to provide critical information, or prompt for a decision to be made', image: person , date:'2024/04/23' ,starRating:1},
    { productName: 'Almonds2',name: 'John Doe', description: 'A dialog is a type of modal window that appears in front of app content to provide critical information, or prompt for a decision to be made', image: person, date:'2024/04/23',starRating:5},
    { productName: 'Almonds3',name: 'John Doe', description: 'A dialog is a type of modalwindow that appears in front of window that appears in front of window that appears in front of window that appears in front ofwindow that appears in front of window that appears in front of window that appears in front of app content to provide critical information, or prompt for a decision to be made', image: person, date:'2024/04/23',starRating:2},
  
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
    <div className="app__peopleReview--main-div">
      <button className='prev-button' onClick={() => sliderRef.current?.slickPrev()}><IoIosArrowBack color="#FFCF2C" fontWeight={600} size={40}/></button>
        <TitleL title='What People Say'/>
        <div className='app_peopleReview-inside-div'>
        <p className='latest-review-p'>Latest reviews</p>
        <Slider ref={sliderRef} {...settings}>
        {reviews.map((review, index) => (
          <div className="app__peopleReview--item-div" key={index}>
             <div className='peopleReview-item-inside'>
              <div className='app__review--stars'>
                {
                [...Array(review.starRating)].map((_,index) =>(
                  <IoStarSharp key={index} fontSize={25} color='#FFCF2C' />
                ))
                }
              </div>
              <div className='review-details'>
                <p className='review-title'>{review.productName}</p>
                <p className='review-description'>{review.description.length} {review.description.length>140 ? (review.description.slice(0,100)+'...'):(review.description)}</p>
                <div className='review-person-details'>
                  <Image className='review-image' src={review.image} alt="reviewed person image" />
                  <div>
                    <p className='review-person-name'>{review.name}</p>
                    <p className='review-date'>{review.date}</p>
                  </div>
                </div>
               
              </div>
             </div>
          </div>
        ))}
        </Slider>
        </div>
      <button className='next-button' onClick={() => sliderRef.current?.slickNext()}><IoIosArrowForward color="#FFCF2C" fontWeight={600} size={40}/></button>
    </div>
  )
}

export default PeopleReview;