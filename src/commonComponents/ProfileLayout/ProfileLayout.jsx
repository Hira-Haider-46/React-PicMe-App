import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import Button from '../Button';
import LayoutNav from './LayoutNav';
import './ProfileLayout.css';

export default function ProfileLayout() {
    const location = useLocation();
    const [photographer, setPhotographer] = useState(() => {
        const storedPhotographer = localStorage.getItem('photographer');
        return storedPhotographer ? JSON.parse(storedPhotographer) : location.state?.photographer;
    });
    const [selectedTab, setSelectedTab] = useState('portfolio');

    useEffect(() => {
        if (photographer) {
            localStorage.setItem('photographer', JSON.stringify(photographer));
        }
    }, [photographer]);

    const portfolioButtonStyles = selectedTab === 'portfolio' 
        ? { backgroundColor: '#2BAFC7', color: 'white', border: '1.5px solid' } 
        : { backgroundColor: 'white', color: '#2BAFC7', border: '1.5px solid #2BAFC7' };

    const packageButtonStyles = selectedTab === 'package' 
        ? { backgroundColor: '#2BAFC7', color: 'white', border: '1.5px solid' } 
        : { backgroundColor: 'white', color: '#2BAFC7', border: '1.5px solid #2BAFC7' };

    if (!photographer) {
        return <div>Loading...</div>;
    }

    return (
        <div className='photographer-profile flex'>
            <div className='header flex'>
                <img src={photographer.profileImg} alt="profile-img" />
                <h2>{photographer.name}</h2>
                <p>{photographer.proficiency}</p>
                <p>
                    <span><FaStar /></span>
                    <span>{photographer.rating}</span>
                    <span>({photographer.NoOfreviews} reviews)</span>
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