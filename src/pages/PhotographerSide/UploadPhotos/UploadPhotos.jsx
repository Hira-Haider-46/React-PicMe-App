import React, { useState, useRef, useEffect } from 'react';
import { FiUpload } from "react-icons/fi";
import photosImg from '../../../assets/images/photos-img.png';
import UploadCard from '../../../commonComponents/UploadCard';
import './UploadPhotos.css';

export default function UploadPhotos() {
    const [showUploadPhotos, setShowUploadPhotos] = useState(false);
    const uploadRef = useRef(null);

    const handleUploadPhotosClick = () => {
        setShowUploadPhotos(true);
    };

    const handleClickOutside = (event) => {
        if (uploadRef.current && !uploadRef.current.contains(event.target)) {
            setShowUploadPhotos(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className='border' id='upload-photos'>
                <h2 className='h2'>Upload Photos</h2>
                <p className='p'>Upload your professional photos.</p>
                <div className="file-upload" style={{ margin: '2em 0' }} onClick={handleUploadPhotosClick}>
                    <label className="upload-section flex">
                        <img src={photosImg} alt="photos-img" />
                        <p className='upload-text'>
                            <span><FiUpload /></span>
                            Upload Photos
                        </p>
                    </label>
                </div>
                <div className='photos-section'>
                    <div className='header-section flex'>
                        <h3>Uploaded Photos</h3>
                        <select className='choose-category category'>
                            <option value="">Select Category</option>
                            <option>No category available</option>
                        </select>
                    </div>
                    <div></div>
                </div>
            </div>

            {showUploadPhotos && <UploadCard uploadRef={uploadRef} onClose={() => setShowUploadPhotos(false)} />}
        </>
    );
}