import React from 'react';
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";

function StarRating({ rating }) {
  const stars = [];
  const totalStars = 5; // Total number of stars

  for (let i = 0; i < totalStars; i++) {
    if (i < Math.floor(rating)) {
      stars.push(
        <span 
          style={{ fontSize: '30px', color: 'green' }} 
          key={i}
        >
          <IoIosStar />
        </span>
      );
    } else if (i === Math.floor(rating) && rating % 1 !== 0) {
      stars.push(
        <span 
          style={{ fontSize: '30px', color: 'green' }} 
          key={i}
        >
          <IoIosStarHalf />
        </span>
      );
    } else {
      stars.push(
        <span 
          style={{ fontSize: '30px', color: 'gray' }} 
          key={i}
        >
          <IoIosStarOutline />
        </span>
      );
    }
  }

  return (
    <div>
      {stars}
    </div>
  );
}

export default StarRating;
