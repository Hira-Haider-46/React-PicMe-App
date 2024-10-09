import React, { useRef } from 'react';
import cloud from '../../assets/images/cloud.png';
import Button from '../Button';
import './UploadCard.css';

export default function UploadCard({ uploadRef, onClose }) {
    const fileInputRef = useRef(null);

    const handleFileUpload = (event) => {
        const files = event.target.files;
        console.log(files);
    };

    return (
        <div className='upload-pictures-div' ref={uploadRef}>
            <h2 className='h2'>Select Your Photos</h2>
            <p className='p'>Create your profile to showcase stunning photography and attract clients.</p>
            <select className='choose-category category1'>
                <option value="">Select Category</option>
                <option>No category available</option>
            </select>
            <div className="file-upload" style={{ margin: '0.5em 0' }}>
                <label htmlFor="photos-upload" className="upload-pics flex">
                    <img src={cloud} alt="cloud-img" />
                    <p className='pics-text'>
                        Drag & drop files or
                        <span> Browse</span>
                    </p>
                    <p>Supported formats: JPEG, PNG</p>
                </label>
                <input
                    id="photos-upload"
                    type="file"
                    accept="image/png, image/jpeg"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                />
            </div>
            <Button text='SUBMIT' variant='fill' onClick={onClose} />
        </div>
    );
}