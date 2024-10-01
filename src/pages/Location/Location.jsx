import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { TbCurrentLocation } from "react-icons/tb";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import PhotographerList from './PhotographerList';
import { GLOBAL_CATEGORIES } from '../../apis/apiUrls';
import { getApiWithAuth } from '../../apis/index';
import { nanoid } from 'nanoid';
import 'leaflet/dist/leaflet.css';
import './Location.css';

export default function Location() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchType = searchParams.get('searchType');

  const [coordinates, setCoordinates] = useState([47.6062, -122.3321]);
  const [locationName, setLocationName] = useState('');
  const [photographerName, setPhotographerName] = useState('');
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [photographers, setPhotographers] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [categories, setCategories] = useState([]);

  const SetViewOnChange = ({ coords }) => {
    const map = useMap();
    map.setView(coords, 13);
    return null;
  };

  const fetchCoordinates = async () => {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${locationName}`);
    const data = await response.json();

    if (data && data.length > 0) {
      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);
      setCoordinates([lat, lon]);
      return { lat, lon };
    } else {
      console.log('Location not found');
      return null;
    }
  };

  const handleSearchByLocation = async () => {
    const coords = await fetchCoordinates();
    if (coords) {
      const { lat, lon } = coords;
      const url = `customers/search_photographer?start_date=${encodeURIComponent(startDate)}&end_date=${encodeURIComponent(endDate)}&latitude=${lat}&longitude=${lon}`;
      const res = await getApiWithAuth(url);
      if (res.success) {
        setPhotographers(res.data);
        setIsSearched(true);
      } else {
        console.error("Error fetching photographers: ", res.data);
      }
    }
  };

  const handleSearchByName = async () => {
  };

  const handleSearchByCategory = async () => {
    const url = '';
    const res = await getApiWithAuth(url);
    if (res.success) {
      setPhotographers(res.data);
      setIsSearched(true);
    } else {
      console.error("Error fetching photographers: ", res.data);
    }
  };

  const formatCategoryName = (category) => {
    return category
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getApiWithAuth(GLOBAL_CATEGORIES);
      if (res.success) {
        setCategories(res.data.data);
        console.log(res.data.data);
      } else {
        console.error("Error fetching categories: ", res.data);
      }
    };

    if (searchType === 'category') {
      fetchCategories();
    }
  }, [searchType]);

  return (
    <div className="location-page">
      <div className="search-container flex">
        {!isSearched ?
          <>
            {searchType === 'location' && (
              <>
                <div className="search flex">
                  <div className='input--group flex'>
                    <IoIosArrowBack />
                    <input
                      type="text"
                      placeholder="Find for Photographers"
                      value={locationName}
                      onChange={(e) => setLocationName(e.target.value)}
                    />
                  </div>
                  <div className='loc-div' onClick={handleSearchByLocation}>
                    <TbCurrentLocation />
                  </div>
                </div>
                <div className="date-container flex">
                  <input
                    className='date-group'
                    type="date"
                    placeholder='From'
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <input
                    className='date-group'
                    type="date"
                    placeholder='To'
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </>
            )}

            {searchType === 'name' && (
              <div className='search-bar flex'>
                <input
                  type="text"
                  placeholder='Search Photographer By Name'
                  value={photographerName}
                  onChange={(e) => setPhotographerName(e.target.value)}
                />
                <IoSearchOutline onClick={handleSearchByName} style={{ cursor: 'pointer' }} />
              </div>
            )}

            {searchType === 'category' && (
              <div className="search-by-category flex">
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    handleSearchByCategory(e.target.value);
                  }}
                >
                  <option value="">Select Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            )}
          </> : (
              <PhotographerList location={locationName} photographers={photographers} setIsSearched={setIsSearched} searchType={searchType} />
          )
        }
      </div>

      <MapContainer center={coordinates} zoom={13} style={{ minHeight: "125vh", width: "100%", borderRadius: '15px', border: 'none' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {photographers.map((photographer) => (
          <Marker
            key={nanoid()}
            position={[
              photographer.latitude,
              photographer.longitude
            ]}
          />
        ))}

        <SetViewOnChange coords={coordinates} />
      </MapContainer>
    </div>
  );
}