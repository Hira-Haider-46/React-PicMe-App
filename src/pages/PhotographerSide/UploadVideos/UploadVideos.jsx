import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FiUpload } from "react-icons/fi";
import { LuLoader2 } from "react-icons/lu";
import { FETCH_PHOTOGRAPHER_WORK_CATEGORY, FETCH_PHOTOGRAPHER_WORK_BY_ID } from '../../../apis/apiUrls';
import { getApiWithAuth } from '../../../apis/index';
import videosImg from '../../../assets/images/video-play-button.png';
import { formatCategoryName } from '../../../helper/helper';
import UploadCard from '../../../commonComponents/UploadCard';
import Videos from '../../CustomerSide/PhotographerProfile/Portfolio/Tabs/Videos';
import './UploadVideos.css';

export default function UploadVideos() {
    const [showUploadVideos, setShowUploadVideos] = useState(false);
    const uploadRef = useRef(null);
    const [categories, setCategories] = useState([]);
    const [photographerWork, setPhotographerWork] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [filteredVideos, setFilteredVideos] = useState([]);
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
                setFilteredVideos(res.data.data[0].videos); 
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
            setFilteredVideos(selectedWork.videos); 
        } else {
            setFilteredVideos([]);
        }
        setLoading(false);
    };

    const handleUploadVideosClick = () => {
        setShowUploadVideos(true);
    };

    const handleClickOutside = (event) => {
        if (uploadRef.current && !uploadRef.current.contains(event.target)) {
            setShowUploadVideos(false);
        }
    };

    const handleRefreshVideos = async () => {
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
            <div className='border' id='upload-videos' style={showUploadVideos ? { opacity: 0.4 } : null}>
                <h2 className='h2'>Upload Videos</h2>
                <p className='p'>Upload your professional videos.</p>
                <div className="file-upload" style={{ margin: '2em 0' }} onClick={handleUploadVideosClick}>
                    <label className="upload-section flex">
                        <img src={videosImg} alt="videos-img" />
                        <p className='upload-text'>
                            <span><FiUpload /></span>
                            Upload Videos
                        </p>
                    </label>
                </div>
                <div className='photos-section'>
                    <div className='header-section flex'>
                        <h3>Uploaded Videos</h3>
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
                            <Videos videos={filteredVideos} selectedCategory={selectedCategory} path='upload-videos' /> 
                        ) : (
                            <p className='select-msg'>Select category to view videos</p>
                        )
                    )}
                </div>
            </div>

            {showUploadVideos && (
                <UploadCard
                    uploadRef={uploadRef}
                    onClose={() => setShowUploadVideos(false)}
                    categories={categories}
                    photographerWork={photographerWork}
                    onUploadSuccess={handleRefreshVideos}
                    mediaType='videos'
                />
            )}
        </>
    );
}