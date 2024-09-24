import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { getApiWithAuth } from '../../apis';
import { ME } from '../../apis/apiUrls';
import 'leaflet/dist/leaflet.css';
import './Map.css';

const position = [47.6062, -122.3321];

export default function Map() {
    const [userData, setUserData] = useState({})
    const handleGetUser = async (e) => {
        const res = await getApiWithAuth(ME)
        if (res.success) {
            console.log(res)
            setUserData(res.data.user)

        } else {
            console.log("Usrer error ", res)
        }

    };
    useEffect(() => {
        handleGetUser()
    }, [])

    return (

        // <>
        // <h1>{userData.name}</h1>
        // </>
        <div className='map'>
            <MapContainer center={position} zoom={13} style={{ height: "857px", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                    <Popup>
                        A marker popup here.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}