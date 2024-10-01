import React from 'react';
import { TbCurrentLocation } from "react-icons/tb";
import { IoIosArrowBack } from "react-icons/io";
import './LocationOption.css';

export default function LocationOption({ locationName, setLocationName, startDate, setStartDate, endDate, setEndDate, handleSearchByLocation }) {
  const handleLocationChange = (e) => {
    setLocationName(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleSearchClick = () => {
    if (!locationName) {
      alert("Please enter a location.");
      return;
    }

    handleSearchByLocation(); 
  };

  return (
    <>
      <div className="search flex">
        <div className='input--group flex'>
          <IoIosArrowBack />
          <input
            type="text"
            placeholder="Find Photographers"
            value={locationName}
            onChange={handleLocationChange}
            aria-label="Location name"
            required
          />
        </div>
        <div className='loc-div' onClick={handleSearchClick} aria-label="Search for photographers">
          <TbCurrentLocation />
        </div>
      </div>
      <div className="date-container flex">
        <input
          className='date-group'
          type="date"
          placeholder='From'
          value={startDate}
          onChange={handleStartDateChange}
          aria-label="Start date"
          required
        />
        <input
          className='date-group'
          type="date"
          placeholder='To'
          value={endDate}
          onChange={handleEndDateChange}
          aria-label="End date"
          required
        />
      </div>
    </>
  );
}