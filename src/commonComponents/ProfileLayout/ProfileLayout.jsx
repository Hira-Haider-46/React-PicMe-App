import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { getApiWithAuth } from '../../apis/index';
import { FETCH_PHOTOGRAPHER_BY_ID } from '../../apis/apiUrls';
import profileImg from '../../assets/images/ProfileImg.png';
import Button from '../Button';
import LayoutNav from './LayoutNav';
import './ProfileLayout.css';

export default function ProfileLayout() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const photographerId = queryParams.get('id');
    const [selectedTab, setSelectedTab] = useState('portfolio');
    const [photographer, setPhotographer] = useState();
    const [loading, setLoading] = useState(false);

    const fetchPhotographer = async () => {
        setLoading(true);
        const res = await getApiWithAuth(`${FETCH_PHOTOGRAPHER_BY_ID}${photographerId}`);
        if (res.success) {
            setPhotographer(res.data.data);
            console.log(res.data.data);
        } else {
            console.error('error fetching data', res.data)
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPhotographer();
    }, [photographerId]);

    const portfolioButtonStyles = selectedTab === 'portfolio'
        ? { backgroundColor: '#2BAFC7', color: 'white', border: '1.5px solid' }
        : { backgroundColor: 'white', color: '#2BAFC7', border: '1.5px solid #2BAFC7' };

    const packageButtonStyles = selectedTab === 'package'
        ? { backgroundColor: '#2BAFC7', color: 'white', border: '1.5px solid' }
        : { backgroundColor: 'white', color: '#2BAFC7', border: '1.5px solid #2BAFC7' };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='photographer-profile flex'>
            {console.log(photographer?.profile_image_url)}
            <div className='header flex'>
                <img src={photographer?.profile_image_url !== '' ? photographer?.profile_image_url : profileImg} alt="profile-img" />
                <h2>{photographer?.full_name}</h2>
                <p>
                    <span><FaStar /></span>
                    <span>4.0</span>
                    <span>(5 reviews)</span>
                </p>
                <div className='btns flex'>
                    <Link to='.' onClick={() => setSelectedTab('portfolio')}>
                        <Button text='Portfolio' styles={portfolioButtonStyles} />
                    </Link>
                    <Link to='package' onClick={() => setSelectedTab('package')}>
                        <Button text='Package' styles={packageButtonStyles} />
                    </Link>
                </div>
            </div>

            {selectedTab === 'portfolio' ? (
                <>
                    <LayoutNav selectedTab={selectedTab} />
                    <Outlet />
                </>
            ) : (
                <div className="package-content">
                    <LayoutNav selectedTab={selectedTab} />
                    <Outlet />
                </div>
            )}
        </div>
    );
}