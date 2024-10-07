import React from 'react';
import './PhotoCard.css';

export default function PhotoCard({ photoUrl }) {
  return (
    <div className="photo-card">
      <img src={photoUrl} alt="photographer-work-img" />
    </div>
  );
}