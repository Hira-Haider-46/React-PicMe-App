import React from 'react';
import './VideoCard.css';

export default function VideoCard({ videoUrl }) {
    return (
        <div className='video-card'>
            <img src={videoUrl} alt="card-img" />
        </div>
    )
}