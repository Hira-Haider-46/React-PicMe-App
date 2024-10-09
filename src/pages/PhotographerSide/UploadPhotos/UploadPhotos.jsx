import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FiUpload } from "react-icons/fi";
import { FETCH_PHOTOGRAPHER_WORK_CATEGORY, FETCH_PHOTOGRAPHER_WORK_BY_ID } from '../../../apis/apiUrls';
import { getApiWithAuth } from '../../../apis/index';
import photosImg from '../../../assets/images/photos-img.png';
import { formatCategoryName } from '../../../helper/helper';
import UploadCard from '../../../commonComponents/UploadCard';
import './UploadPhotos.css';
import Photos from '../../CustomerSide/PhotographerProfile/Portfolio/Tabs/Photos';

export default function UploadPhotos() {
    const [showUploadPhotos, setShowUploadPhotos] = useState(false);
    const uploadRef = useRef(null);
    const [categories, setCategories] = useState([]);

    const user = useSelector((state) => state.auth.user);
    const photographerId = user?.id;

    const fetchCategories = async () => {
        const res = await getApiWithAuth(`${FETCH_PHOTOGRAPHER_WORK_CATEGORY}${photographerId}`);
        if (res.success) {
            const formattedCategories = res.data.data.map(category => ({
                label: formatCategoryName(category),
                value: category,
            }));
            setCategories(formattedCategories);
        } else {
            console.error(res.data.message);
        }
    };

    const fetchPhotographerWork = async () => {
        const res = await getApiWithAuth(`${FETCH_PHOTOGRAPHER_WORK_BY_ID}=${photographerId}`);
        if (res.success) {
            console.log('photo work', res.data.data);
        } else {
            console.error(res.data.message);
        }
    }

    const handleUploadPhotosClick = () => {
        setShowUploadPhotos(true);
    };

    const handleClickOutside = (event) => {
        if (uploadRef.current && !uploadRef.current.contains(event.target)) {
            setShowUploadPhotos(false);
        }
    };

    useEffect(() => {
        if (photographerId) {
            fetchCategories();
            fetchPhotographerWork();
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [photographerId]);

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
                            {categories?.length > 0 ? (
                                categories.map((category, index) => (
                                    <option key={index} value={category.value}>
                                        {category.label}
                                    </option>
                                ))
                            ) : (
                                <option>No category available</option>
                            )}
                        </select>
                    </div>
                    <Photos photos='' selectedCategory= ''/>
                </div>
            </div>

            {showUploadPhotos && <UploadCard uploadRef={uploadRef} onClose={() => setShowUploadPhotos(false)} />}
        </>
    );
}