import React from 'react';
import './VideoCard.css';

export default function VideoCard({ videoUrl }) {
    return (
        <div className='video-card'>
            <video controls>
                <source src={videoUrl} />
            </video>
        </div>
    );
}