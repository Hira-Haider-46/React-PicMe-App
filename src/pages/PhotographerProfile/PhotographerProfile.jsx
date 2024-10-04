import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { LuLoader2 } from "react-icons/lu";
import { getApiWithAuth } from '../../apis/index';
import { FETCH_PHOTOGRAPHER_BY_ID, SHOW_PACKAGE } from '../../apis/apiUrls';
import profileImg from '../../assets/images/ProfileImg.png';
import Button from '../../commonComponents/Button';
import Portfolio from './Portfolio';
import Packages from './Packages';
import './PhotographerProfile.css';

export default function PhotographerProfile() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const photographerId = queryParams.get('id');
    const [selectedTab, setSelectedTab] = useState('portfolio');
    const [photographer, setPhotographer] = useState();
    const [packages, setPackages] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchPhotographer = async () => {
        setLoading(true);
        const res = await getApiWithAuth(`${FETCH_PHOTOGRAPHER_BY_ID}${photographerId}`);
        if (res.success) {
            setPhotographer(res.data.data);
        } else {
            console.error('error fetching data', res.data)
        }
        setLoading(false);
    };

    const fetchPackages = async () => {
        setLoading(true);
        const res = await getApiWithAuth(`${SHOW_PACKAGE}${photographerId}`);
        if (res.success) {
            setPackages(res.data.data);
            console.log('packages', packages);
        } else {
            console.error('error fetching data', res.data)
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchPhotographer();
    }, [photographerId]);

    const variant = selectedTab === 'portfolio' ? 'fill' : 'empty';
    const variant1 = selectedTab === 'package' ? 'fill' : 'empty';

    if (loading) {
        return <LuLoader2 className="loader profileLoader" />;
    }

    return (
        <div className='photographer-profile flex'>
            <div className='header flex'>
                {/* <img src={photographer?.profile_image_url !== '' ? photographer?.profile_image_url : profileImg} alt="profile-img" /> */}
                <img src={profileImg} alt="profile-img" />
                <h2>{photographer?.name}</h2>
                <p>
                    <span><FaStar /></span>
                    <span>4.0</span>
                    <span>(5 reviews)</span>
                </p>
                <div className='btns flex'>
                    <Button text='Portfolio' variant={variant} onClick={() => setSelectedTab('portfolio')} />
                    <Button text='Package' variant={variant1} onClick={() => {
                        setSelectedTab('package');
                        fetchPackages();
                    }
                    } />
                </div>
            </div>

            {selectedTab === 'portfolio' ? ( <Portfolio /> ) : (
                <div className="package-content">
                    {loading ? <LuLoader2 className="loader" /> : <Packages packages={packages} />}
                </div>
            )}
        </div>
    )
}