import React from 'react';
import playButtonImg from '../../../../../../assets/images/playButtonImg.png';
import './VideoCard.css';

export default function VideoCard({ videoUrl }) {
    return (
        <div className='video-card'>
            <img src={videoUrl} alt="card-img" />
            <img src={playButtonImg} alt="play-button-img" />
        </div>
    )
}