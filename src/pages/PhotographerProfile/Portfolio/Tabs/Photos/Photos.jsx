import React from 'react';
import PhotoCard from './PhotoCard';
import './Photos.css';

export default function Photos({ photos }) {
  return (
    <div className='photos-container' style={photos.length === 0 ? {display: 'flex'} : {display: 'grid'}}>
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