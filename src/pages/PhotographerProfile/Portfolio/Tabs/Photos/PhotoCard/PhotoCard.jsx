import React from 'react';
import img from '../../../../../../assets/images/photoCard.png';
import './PhotoCard.css';

export default function PhotoCard() {
  return (
    <div className='photo-card'>
      <img src={img} alt="card-img" />
    </div>
  )
}