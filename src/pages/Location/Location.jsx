import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { TbCurrentLocation } from "react-icons/tb";
import { IoIosArrowBack } from "react-icons/io";
import { LuCalendarDays } from "react-icons/lu";
import PhotographerList from './PhotographerList';
import { getApiWithAuth } from '../../apis/index';
import 'leaflet/dist/leaflet.css';
import './Location.css';

export default function Location() {
    const [coordinates, setCoordinates] = useState([47.6062, -122.3321]);
    const [location, setLocation] = useState('');
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
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`);
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

    const handleSearch = async (e) => {
        e.preventDefault();
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

    return (
        <div className="location-page">
            {!isSearched ? ( 
                <div className="search-container flex">
                    <div className="search flex">
                        <div className='input--group flex'>
                            <IoIosArrowBack />
                            <input
                                type="text"
                                placeholder="Find for Photographers"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                        <div className='loc-div' onClick={handleSearch}>
                            <TbCurrentLocation />
                        </div>
                    </div>
                    <div className="date-container flex">
                        <div className='date-group flex'>
                            <input 
                                type="text" 
                                placeholder='From' 
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)} 
                            />
                            <LuCalendarDays />
                        </div>
                        <div className='date-group flex'>
                            <input 
                                type="text" 
                                placeholder='To' 
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)} 
                            />
                            <LuCalendarDays />
                        </div>
                    </div>
                </div>
            ) : (
                <div className='photographer-list'>
                    <PhotographerList location={location} photographers={photographers} />
                </div>
            )}

            <MapContainer center={coordinates} zoom={13} style={{ height: "100%", width: "100%", borderRadius: '15px' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {photographers.map((photographer) => (
                    <Marker 
                        key={photographer.id} 
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