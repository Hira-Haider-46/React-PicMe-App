import React, { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Location.css';

export default function Location() {
  const [coordinates, setCoordinates] = useState([47.6062, -122.3321]);

  const handleSelect = (location) => {
    const lat = location.geometry.location.lat();
    const lng = location.geometry.location.lng();
    setCoordinates([lat, lng]);
  };

  const apiKey = import.meta.env.VITE_API_KEY;

  return (
    <div className='location-page'>
      <div className="search-bar">
        <GooglePlacesAutocomplete
          apiKey={apiKey}
          selectProps={{
            onChange: handleSelect,
            placeholder: 'Find Photographers'
          }}
        />
      </div>

      <MapContainer center={coordinates} zoom={13} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={coordinates}>
        </Marker>
      </MapContainer>
    </div>
  );
}