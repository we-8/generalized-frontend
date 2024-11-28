'use client';
import React, { useState, useRef } from 'react';
import Lottie from 'react-lottie-player';
import { AnimationItem } from 'lottie-web';  // Import the correct type from lottie-web
import '../../styles/main-pages-css/Review.css';
import { animation1, angryani, sadani, neutralani, smileani } from '@/assets';

const Review = () => {
  const [hoveredKey, setHoveredKey] = useState<number | null>(null); // Track the hovered emoji key

  // Using the correct type AnimationItem from lottie-web
  const lottieRefs = useRef<(AnimationItem | null)[]>([]); // Array of refs for each Lottie animation

  const emojiset = [
    { key: 1, emojiAnimation: angryani },
    { key: 2, emojiAnimation: sadani },
    { key: 3, emojiAnimation: neutralani },
    { key: 4, emojiAnimation: animation1 },
    { key: 5, emojiAnimation: smileani },
  ];

  const handleMouseLeave = (index: number) => {
    setHoveredKey(null); // Reset hovered key
    const currentRef = lottieRefs.current[index]; // Access the specific ref
    if (currentRef) {
      currentRef.goToAndStop(0, true); // Reset to the first frame
    }
  };

  return (
    <div>
      <h1>Review</h1>
      <div className="app__review--emoji-main-div">
        {emojiset.map((item, index) => (
          <div
            key={item.key}
            className="app__review--emoji-set"
            onMouseEnter={() => setHoveredKey(item.key)} // Set the hovered emoji key
            onMouseLeave={() => handleMouseLeave(index)} // Call the reset function
            style={{ cursor: 'pointer' }}
          >
            <Lottie
              ref={(el) => { lottieRefs.current[index] = el ? el : null; }} // Simply assign ref
              loop={false}
              animationData={item.emojiAnimation}
              play={hoveredKey === item.key} // Play only if this emoji is hovered
              style={{ width: 80, height: 80 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
