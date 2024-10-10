import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { LuLoader2 } from "react-icons/lu";
import { formatCategoryName } from '../../../../helper/helper';
import { FETCH_PHOTOGRAPHER_WORK_BY_ID, FETCH_PHOTOGRAPHER_WORK_CATEGORY } from '../../../../apis/apiUrls';
import { getApiWithAuth } from '../../../../apis/index';
import Photos from './Tabs/Photos';
import Videos from './Tabs/Videos';
import Reviews from './Tabs/Reviews';
import './Portfolio.css';

export default function Portfolio() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const photographerId = queryParams.get('id');

  const [navbarTab, setNavbarTab] = useState('photos');
  const [photographerWork, setPhotographerWork] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    const res = await getApiWithAuth(`${FETCH_PHOTOGRAPHER_WORK_CATEGORY}${photographerId}`);
    if (res.success) {
      const formattedCategories = res.data.data.map(category => ({
        label: formatCategoryName(category),
        value: category,
      }));
      setCategories(formattedCategories);
      console.log('categories, photographerId', res.data.data, photographerId);
    } else {
      console.error(res.data.message);
    }
    setLoading(false);
  };

  const fetchPhotographerWork = async () => {
    setLoading(true);
    const res = await getApiWithAuth(`${FETCH_PHOTOGRAPHER_WORK_BY_ID}${photographerId}`);
    if (res.success) {
      setPhotographerWork(res.data.data);
    } else {
      console.error(res.data.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, [photographerId]);

  useEffect(() => {
    fetchPhotographerWork();
  }, [selectedCategory]);

  useEffect(() => {
    if (photographerWork) {
      const filteredObj = photographerWork.filter(obj => obj.work_type === selectedCategory);
      if (filteredObj.length > 0) {
        const { photos, videos } = filteredObj[0];
        setPhotos(photos);
        setVideos(videos);
      }
    }
  }, [photographerWork]);

  const activeStyles = {
    fontWeight: "bold",
    color: "#2BAFC7",
    borderBottom: "2px solid #2BAFC7",
  };

  return (
    <>
      <nav className="layout-nav flex">
        <ul className='flex'>
          <li
            style={navbarTab === 'photos' ? activeStyles : {}}
            onClick={() => setNavbarTab('photos')}
          >
            Photos
            <span>
              <MdOutlineKeyboardArrowDown />
            </span>
          </li>
          <li
            style={navbarTab === 'videos' ? activeStyles : {}}
            onClick={() => setNavbarTab('videos')}
          >
            Videos
            <span>
              <MdOutlineKeyboardArrowDown />
            </span>
          </li>
          <li
            style={navbarTab === 'reviews' ? activeStyles : {}}
            onClick={() => setNavbarTab('reviews')}
          >
            Reviews
            <span>
              <MdOutlineKeyboardArrowDown />
            </span>
          </li>
        </ul>
        {navbarTab !== 'reviews' &&
          <select
            className='choose-category'
            style={{width: '25%'}}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select Category</option>
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
        }
      </nav>
      {loading ? (
        <LuLoader2 className="loader load" />
      ) : (
        <>
          {navbarTab === 'photos' && <Photos photos={photos} selectedCategory={selectedCategory} />}
          {navbarTab === 'videos' && <Videos videos={videos} selectedCategory={selectedCategory} />}
          {navbarTab === 'reviews' && <Reviews />}
          {(!selectedCategory && navbarTab !== 'reviews') && <p className='select-msg'>Select category to list photographers work</p>}
        </>
      )}
    </>
  );
}