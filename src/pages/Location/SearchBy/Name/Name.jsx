import React from 'react';
import './Name.css';

export default function Name({ photographerName, setPhotographerName, handleSearchByName }) {
  return (
    <div className="search-by-name">
      <input
        type="text"
        placeholder="Enter Photographer's Name"
        value={photographerName}
        onChange={(e) => setPhotographerName(e.target.value)}
      />
      <button onClick={handleSearchByName}>Search</button>
    </div>
  )
}
