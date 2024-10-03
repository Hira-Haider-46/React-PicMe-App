import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RiLogoutCircleLine } from "react-icons/ri";
import { logout } from '../../store/slices/authSlice';
import logo from '../../assets/images/logo.png';
import navLogo from '../../assets/images/navLogo2.png';
import cameraImg from '../../assets/images/camera-img.png';
import homePic from '../../assets/images/home.png';
import chatPic from '../../assets/images/chat.png';
import profilePic from '../../assets/images/profile.png';
import './Layout.css';

export default function Layout() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        setToken(null);
    };

    useEffect(() => {
        const handleStorageChange = () => {
            setToken(localStorage.getItem('token'));
        };
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <>
            {token ? (
                <div className='customer-layout flex'>
                    <nav className='navbar flex'>
                        <Link to='/choose-location'><img src={navLogo} alt="navLogo" /></Link>
                        <ul className='flex'>
                            <Link to='/choose-location'>
                                <li>
                                    <img src={homePic} alt="homePic" /> Home
                                </li>
                            </Link>
                            <Link to=''>
                                <li>
                                    <img src={chatPic} alt="chatPic" /> Chats
                                </li>
                            </Link>
                            <Link to=''>
                                <li>
                                    <img src={profilePic} alt="profilePic" /> Profile
                                </li>
                            </Link>
                            <Link to=''>
                                <li className='logout flex'>
                                    <RiLogoutCircleLine style={{marginRight: '0.5em', fontSize: '1.25rem'}}/> Logout
                                </li>
                            </Link>
                        </ul>
                    </nav>
                    <div className='padding'>
                        <Outlet />
                    </div>
                </div>
            ) : (
                <div className='layout flex'>
                    <div className='text-portion'>
                        <nav className='nav'>
                            <Link to='/choose-location'><img src={logo} alt="logo" /></Link>
                        </nav>
                        <Outlet />
                    </div>
                    <div className="img-portion flex">
                        <img src={cameraImg} alt="camera-img" />
                    </div>
                </div>
            )}
        </>
    );
}