import React from 'react';
import img from '../../../assets/images/photoCard.png';
import playButtonImg from '../../../assets/images/playButtonImg.png';
import './VideoCard.css';

export default function VideoCard() {
    return (
        <div className='video-card'>
            <img src={img} alt="card-img" />
            <img src={playButtonImg} alt="play-button-img" />
        </div>
    )
}