import React from 'react';
import '../../styles/components-css/Herobanner.css';
import { StaticImageData } from 'next/image';

type imageProp={
  backgroundImage:string | StaticImageData,
  title:string,
  description:string
}

const Herobanner:React.FC<imageProp> = ({backgroundImage,title,description}) => {
  return (
    <div className='app__herobanner--main-div '>
      <div className='app__herobanner--img' style={{backgroundImage: `url(${typeof backgroundImage === 'string' ? backgroundImage : backgroundImage.src})`}}>
      <div className='app__herobanner--details'>
         <div>
          <p className='herobanner__title'>{title}</p>
          <p className='herobanner_description'>{description}</p>
         </div>
      </div>
      </div>
      
    </div>
  ) 
}

const Herobanner2:React.FC<imageProp> = ({backgroundImage,title,description}) => {
  return (
    <div className='app__herobanner--main-div '>
      <div className='app__herobanner--img' style={{backgroundImage: `url(${typeof backgroundImage === 'string' ? backgroundImage : backgroundImage.src})`}}>
      <div className='app__herobanner--details'>
         <div>
          <p className='herobanner__title2'>{title}</p>
          <p className='herobanner_description'>{description}</p>
         </div>
      </div>
      </div>
      
    </div>
  ) 
}

export {Herobanner,Herobanner2};