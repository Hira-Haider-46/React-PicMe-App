import React, { useState } from 'react';
import { MdOutlineDeleteOutline } from "react-icons/md";
import './PhotoCard.css';

export default function PhotoCard({ photoUrl, path }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="photo-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && path && (
        <MdOutlineDeleteOutline className="delete-icon" />
      )}
      <img src={photoUrl} alt="photographer-work-img" />
    </div>
  );
}