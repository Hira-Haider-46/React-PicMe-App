import React from 'react';
import { FaStar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import './PhotographerListCard.css';

export default function PhotographerListCard({ obj }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/photographer-profile', { state: { photographer: obj } });
    }

    return (
        <div className='card flex' onClick={handleClick}>
            <img src={obj.profileImg} alt="profile-img" />
            <h2>{obj.name}</h2>
            <p>{obj.profeciency}</p>
            <p>
                <span><FaStar /></span>
                <span>{obj.rating}</span>
                <span>({obj.NoOfreviews} reviews)</span>
            </p>
        </div>
    );
}