import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FETCH_PHOTOGRAPHER_WORK_BY_ID, FETCH_PHOTOGRAPHER_WORK_CATEGORY } from '../../../apis/apiUrls'; 
import { getApiWithAuth } from '../../../apis/index';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { formatCategoryName } from '../../../helper/helper';
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

  const fetchCategories = async () => {
    const res = await getApiWithAuth(`${FETCH_PHOTOGRAPHER_WORK_CATEGORY}${photographerId}`);
    if (res.success) {
      const formattedCategories = res.data.data.map(category => ({
        label: formatCategoryName(category),
        value: category,
      }));
      setCategories(formattedCategories);
      console.log('categories:', formattedCategories);
    } else {
      console.error(res.data.message);
    }
  }

  const fetchPhotographerWork = async () => {
    const res = await getApiWithAuth(`${FETCH_PHOTOGRAPHER_WORK_BY_ID}${photographerId}`);
    if (res.success) {
      setPhotographerWork(res.data.data);
      console.log('Photographer work:', res.data.data);
    } else {
      console.error(res.data.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [photographerId]);

  useEffect(() => {
    if (selectedCategory) {
      fetchPhotographerWork();
    }
  }, [selectedCategory]);

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
        <select
          className='choose-category'
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((category, index) => (
            <option key={index} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </nav>
      {navbarTab === 'photos' && <Photos photos={photos} />}
      {navbarTab === 'videos' && <Videos videos={videos} />}
      {navbarTab === 'reviews' && <Reviews />}
    </>
  );
}