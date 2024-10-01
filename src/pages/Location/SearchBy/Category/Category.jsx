import React from 'react';
import './Category.css';

export default function Category({ category, setCategory, handleSearchByCategory }) {
  return (
    <div className="search-by-category">
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        <option value="Wedding">Wedding</option>
        <option value="Portrait">Portrait</option>
        <option value="Event">Event</option>
      </select>
      <button onClick={handleSearchByCategory}>Search</button>
    </div>
  )
}