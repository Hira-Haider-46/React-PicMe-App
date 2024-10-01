import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import PhotographerList from './PhotographerList';
import { nanoid } from 'nanoid';
import SearchByLocation from './SearchBy/LocationOption';
import SearchByName from './SearchBy/Name';
import SearchByCategory from './SearchBy/Category';
import { getApiWithAuth } from '../../apis/index'; 
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

  const handleSearchByLocation = async (e) => {
    const coords = await fetchCoordinates(locationName);
    if (coords) {
      const { lat, lon } = coords;
      const url = `customers/search_photographer?start_date=${encodeURIComponent(startDate)}&end_date=${encodeURIComponent(endDate)}&latitude=${lat}&longitude=${lon}`;
      const res = await getApiWithAuth(url);
      if (res.success) {
        setPhotographers(res.data);
        setCoordinates([lat, lon]);
        setIsSearched(true);
      } else {
        console.error("Error fetching photographers: ", res.data);
      }
    }
  };

  const handleSearchByName = () => { }

  const handleSearchByCategory = () => { }

  return (
    <div className="location-page">
      {!isSearched ? (
        <div className="search-container flex">
          {searchType === 'location' && (
            <SearchByLocation
              locationName={locationName}
              setLocationName={setLocationName}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              handleSearchByLocation={handleSearchByLocation}
            />
          )}

          {searchType === 'name' && (
            <SearchByName
              photographerName={photographerName}
              setPhotographerName={setPhotographerName}
              handleSearchByName={handleSearchByName}
            />
          )}

          {searchType === 'category' && (
            <SearchByCategory
              category={category}
              setCategory={setCategory}
              handleSearchByCategory={handleSearchByCategory}
            />
          )}
        </div>
      ) : (
        <div className='photographer-list'>
          <PhotographerList location={locationName} photographers={photographers} setIsSearched={setIsSearched} />
        </div>
      )}

      <MapContainer center={coordinates} zoom={13} style={{ minHeight: "125vh", width: "100%", borderRadius: '15px', border: 'none' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {photographers.map((photographer) => (
          <Marker
            key={nanoid()}
            position={[photographer.latitude, photographer.longitude]}
          />
        ))}

        <SetViewOnChange coords={coordinates} />
      </MapContainer>
    </div>
  );
}