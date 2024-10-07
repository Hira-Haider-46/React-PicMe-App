import React from 'react';
import { FaStar } from "react-icons/fa";
import './ReviewCard.css';

export default function ReviewCard({ obj }) {

    const starsArray = Array(obj.noOfStars).fill(0);

    return (
        <div className='review-card flex'>
            <div className='image'>
                <img src={obj.profileImg} alt="review-profile-img" />
            </div>
            <div className='text-area'>
                <div className='header-area flex'>
                    <h2>{obj.name}</h2>
                    <span>{obj.date}</span>
                </div>
                <div className='star-div'>
                    {starsArray.map((_, index) => (
                        <FaStar key={index} className="star-icon" />
                    ))}
                </div>
                <p>{obj.text}</p>
            </div>
        </div>
    )
}