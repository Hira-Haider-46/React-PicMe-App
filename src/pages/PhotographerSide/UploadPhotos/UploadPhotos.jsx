import React from 'react';
import { FiUpload } from "react-icons/fi";
import photosImg from '../../../assets/images/photos-img.png';
import './UploadPhotos.css';

export default function UploadPhotos() {
    return (
        <div className='border' id='upload-photos'>
            <h2 className='h2'>Upload Photos</h2>
            <p className='p'>Upload your professional photos.</p>
            <div className="file-upload" style={{margin: '2em 0'}}>
                <label htmlFor="photos-upload" className="upload-section flex">
                    <img src={photosImg} alt="photos-img" />
                    <p className='upload-text'>
                        <span><FiUpload /></span>
                        Upload Photos
                    </p>
                </label>
                <input id="photos-upload" type="file" accept="image/png, image/jpeg" />
            </div>
        </div>
    )
}