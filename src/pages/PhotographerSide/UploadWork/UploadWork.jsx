import React, { useState } from 'react';
import Button from '../../../commonComponents/Button';
import photos from '../../../assets/images/photos-img.png';
import videos from '../../../assets/images/video-play-button.png';
import './UploadWork.css';

export default function UploadWork() {
    const [selectedBox, setSelectedBox] = useState(null);

    const handleBoxClick = (box) => {
        setSelectedBox(selectedBox === box ? null : box);
    };

    return (
        <div className='upload-work border'>
            <h2 className='h2'>Upload Your Work</h2>
            <p className='p'>Upload your photos and videos to showcase your work.</p>
            <div className='boxes-container flex box-contain'>
                <div
                    className={`box boxx ${selectedBox === 'photos' ? 'selected' : ''}`}
                    onClick={() => handleBoxClick('photos')}
                >
                    <img src={photos} alt="photos" />
                    <p>Photos</p>
                </div>
                <div
                    className={`box boxx ${selectedBox === 'videos' ? 'selected' : ''}`}
                    onClick={() => handleBoxClick('videos')}
                >
                    <img src={videos} alt="videos" />
                    <p>Videos</p>
                </div>
            </div>
            <Button text='CONTINUE' variant='fill' />
        </div>
    );
}