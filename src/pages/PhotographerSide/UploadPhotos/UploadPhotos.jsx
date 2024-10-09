import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FiUpload } from "react-icons/fi";
import { LuLoader2 } from "react-icons/lu";
import { FETCH_PHOTOGRAPHER_WORK_CATEGORY, FETCH_PHOTOGRAPHER_WORK_BY_ID } from '../../../apis/apiUrls';
import { getApiWithAuth } from '../../../apis/index';
import photosImg from '../../../assets/images/photos-img.png';
import { formatCategoryName } from '../../../helper/helper';
import UploadCard from '../../../commonComponents/UploadCard';
import Photos from '../../CustomerSide/PhotographerProfile/Portfolio/Tabs/Photos';
import './UploadPhotos.css';

export default function UploadPhotos() {
    const [showUploadPhotos, setShowUploadPhotos] = useState(false);
    const uploadRef = useRef(null);
    const [categories, setCategories] = useState([]);
    const [photographerWork, setPhotographerWork] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [filteredPhotos, setFilteredPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
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
        setLoading(true);
        const res = await getApiWithAuth(`${FETCH_PHOTOGRAPHER_WORK_BY_ID}=${photographerId}`);
        if (res.success) {
            setPhotographerWork(res.data.data);
            if (res.data.data.length > 0) {
                setSelectedCategory(res.data.data[0].work_type);
                setFilteredPhotos(res.data.data[0].photos);
            }
        } else {
            console.error(res.data.message);
        }
        setLoading(false);
    };

    const handleCategoryChange = (event) => {
        setLoading(true);
        const category = event.target.value;
        setSelectedCategory(category);
        const selectedWork = photographerWork.find(work => work.work_type === category);
        if (selectedWork) {
            setFilteredPhotos(selectedWork.photos);
        } else {
            setFilteredPhotos([]);
        }
        setLoading(false);
    };

    const handleUploadPhotosClick = () => {
        setShowUploadPhotos(true);
    };

    const handleClickOutside = (event) => {
        if (uploadRef.current && !uploadRef.current.contains(event.target)) {
            setShowUploadPhotos(false);
        }
    };

    const handleRefreshPhotos = async () => {
        setLoading(true);
        await fetchPhotographerWork();
        setLoading(false);
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
            <div className='border' id='upload-photos' style={showUploadPhotos ? { opacity: 0.4 } : null}>
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
                        <select
                            className='choose-category category'
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                            <option value="">Select category</option>
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
                    {loading ? (
                        <LuLoader2 className="loader" />
                    ) : (
                        selectedCategory ? (
                            <Photos photos={filteredPhotos} selectedCategory={selectedCategory} path='upload-photos'/>
                        ) : (
                            <p className='select-msg'>Select category to view photos</p>
                        )
                    )}
                </div>
            </div>

            {showUploadPhotos && (
                <UploadCard
                    uploadRef={uploadRef}
                    onClose={() => setShowUploadPhotos(false)}
                    categories={categories}
                    photographerWork={photographerWork}
                    onUploadSuccess={handleRefreshPhotos}
                    mediaType='photos'
                />
            )}
        </>
    );
}