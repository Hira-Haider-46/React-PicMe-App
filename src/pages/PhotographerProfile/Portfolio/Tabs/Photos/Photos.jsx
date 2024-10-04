import React from 'react';
import PhotoCard from './PhotoCard';
import './Photos.css';

export default function Photos({ photos }) {
  return (
    <div className='photos-container'>
      {photos.length > 0 ? (
        photos.map((photoUrl, index) => (
          <PhotoCard key={index} photoUrl={photoUrl} />
        ))
      ) : (
        <p>No photos available</p>
      )}
    </div>
  );
}