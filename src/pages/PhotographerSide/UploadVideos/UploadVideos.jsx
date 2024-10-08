import React from 'react';
import { FiUpload } from "react-icons/fi";
import videosImg from '../../../assets/images/video-play-button.png';
import './UploadVideos.css';

export default function UploadVideos() {
    return (
        <div className='border' id='upload-photos'>
            <h2 className='h2'>Upload Videos</h2>
            <p className='p'>Upload your professional videos.</p>
            <div className="file-upload" style={{ margin: '2em 0' }}>
                <label htmlFor="videos-upload" className="upload-section flex">
                    <img src={videosImg} alt="videos-img" />
                    <p className='upload-text'>
                        <span><FiUpload /></span>
                        Upload Videos
                    </p>
                </label>
                <input id="videos-upload" type="file" accept="video/mp4, video/x-m4v, video/*" />
            </div>
            <div className='photos-section'>
                <div className='header-section flex'>
                    <h3>Uploaded Videos</h3>
                    <select className='choose-category category'>
                        <option value="">Select Category</option>
                        <option>No category available</option>
                    </select>
                </div>
                <div></div>
            </div>
        </div>
    )
}