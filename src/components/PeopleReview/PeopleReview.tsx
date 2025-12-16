"use client";

import "../../styles/components-css/PeopleReview.css";
import Image, { StaticImageData } from "next/image";
import React, { useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoStarSharp } from "react-icons/io5";
import { person1, person2, person3 } from "@/assets";
import { TitleL } from "../Title/Title";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

interface Review {
  productName: string;
  name: string;
  description: string;
  image: string | StaticImageData;
  starRating: number;
}

const PeopleReview = () => {
  const sliderRef = useRef<Slider | null>(null);

  const reviews: Review[] = [
    {
      productName: "Traditional Curry Pack",
      name: "Priya Wickramasinghe",
      description:
        "Absolutely incredible! The flavors transported me right back to my grandmother's kitchen. The vacuum packing keeps everything so fresh, and it tastes like it was just made. A must-try for anyone missing authentic Sri Lankan food.",
      image: person1,
      starRating: 5,
    },
    {
      productName: "Roasted Cashews",
      name: "Rajiv Fernando",
      description:
        "I've been ordering from Ceylon Rich Products for months now, and the quality never disappoints. The cashews are perfectly roasted with just the right amount of seasoning. It's become my go-to snack!",
      image: person2,
      starRating: 5,
    },
    {
      productName: "Spice Selection Box",
      name: "Amara Silva",
      description:
        "Living abroad, I was so happy to find Ceylon Rich Products. The spices are aromatic and authentic, and the packaging ensures they arrive fresh. The delivery to Australia was smooth and quick. Highly recommended!",
      image: person3,
      starRating: 5,
    },
  ];

  const settings = {
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1440, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="app__peopleReview--main-div">
      <button
        className="prev-button"
        onClick={() => sliderRef.current?.slickPrev()}
      >
        <IoIosArrowBack color="#FFCF2C" fontWeight={600} size={40} />
      </button>

      <TitleL title="What Our Customers Say" />
      <p className="app__peopleReview--subtitle">
        Hear from our happy customers who have experienced the authentic taste
        of Sri Lanka
      </p>

      <div className="app_peopleReview-inside-div">
        <Slider ref={sliderRef} {...settings}>
          {reviews.map((review, index) => (
            <div className="app__peopleReview--item-div" key={index}>
              <div className="peopleReview-item-inside">
                
                {/* 1. Stars (At top) */}
                <div className="app__review--stars">
                  {[...Array(review.starRating)].map((_, i) => (
                    <IoStarSharp key={i} fontSize={25} color="#FFCF2C" />
                  ))}
                </div>

                {/* 2. Description (In middle) */}
                <div className="review-details">
                  <p className="review-description">{review.description}</p>
                </div>

                {/* 3. Person Details (At bottom - Photo + Name side by side) */}
                <div className="review-person-details">
                  <div className="review-person-info" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Image
                      src={review.image}
                      alt={review.name}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <p className="review-name" style={{ margin: 0 }}>{review.name}</p>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </Slider>
      </div>

      <button
        className="next-button"
        onClick={() => sliderRef.current?.slickNext()}
      >
        <IoIosArrowForward color="#FFCF2C" fontWeight={600} size={40} />
      </button>
    </div>
  );
};

export default PeopleReview;