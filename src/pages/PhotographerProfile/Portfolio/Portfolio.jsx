import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FETCH_PHOTOGRAPHER_WORK_BY_ID } from '../../../apis/apiUrls';
import { getApiWithAuth } from '../../../apis/index';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Photos from './Tabs/Photos';
import Videos from './Tabs/Videos';
import Reviews from './Tabs/Reviews';
import './Portfolio.css';

export default function Portfolio() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const photographerId = queryParams.get('id');
  const [navbarTab, setNavbarTab] = useState('photos');
  const [photographerWork, setPhotographerWork] = useState();

  const fetchPhotographerWork = async () => {
    const res = await getApiWithAuth(`${FETCH_PHOTOGRAPHER_WORK_BY_ID}${photographerId}`);
    if (res.success) {
      setPhotographerWork(res.data.data);
      console.log('photographers work', res.data.data);
    } else {
      console.error(res.data.message);
    }
  }

  useEffect(() => {
    fetchPhotographerWork();
  }, []);

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
      </nav>
      {navbarTab === 'photos' && <Photos />}
      {navbarTab === 'videos' && <Videos />}
      {navbarTab === 'reviews' && <Reviews />}
    </>
  );
}