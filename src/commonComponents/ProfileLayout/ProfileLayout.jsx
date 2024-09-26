import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import Button from '../Button';
import LayoutNav from './LayoutNav';
import './ProfileLayout.css';

export default function ProfileLayout() {
    const location = useLocation();
    const navigate = useNavigate();

    const [photographer, setPhotographer] = useState(location.state?.photographer);
    const [selectedTab, setSelectedTab] = useState('portfolio');
    
    useEffect(() => {
        if (!photographer) {
            const storedPhotographer = localStorage.getItem('photographer');
            if (storedPhotographer) {
                setPhotographer(JSON.parse(storedPhotographer));
            }
            //  else {
            //     navigate("/location");
            // }
        }
    }, [photographer, navigate]);

    useEffect(() => {
        if (photographer) {
            localStorage.setItem('photographer', JSON.stringify(photographer));
        }
    }, [photographer]);

    useEffect(() => {
        return () => {
            localStorage.removeItem('photographer');
        };
    }, []);

    if (!photographer) {
        return <div>Loading...</div>;
    }
    console.log(photographer);
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
                    <Link to='' onClick={() => setSelectedTab('portfolio')}>
                        <Button text='Portfolio' styles={{ backgroundColor: '#2BAFC7', color: 'white', border: '1.5px solid' }} />
                    </Link>
                    <Link to='' onClick={() => setSelectedTab('package')}>
                        <Button text='Package' styles={{ backgroundColor: 'white', color: '#2BAFC7', border: '1.5px solid #2BAFC7' }} />
                    </Link>
                </div>
            </div>

            {selectedTab === 'portfolio' ? (
                <>
                    <LayoutNav />
                    <Outlet />
                </>
            ) : (
                <div className="package-content">
                    <h2>Package Information</h2>
                </div>
            )}
        </div>
    );
}