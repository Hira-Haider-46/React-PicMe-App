import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RiLogoutCircleLine } from "react-icons/ri";
import { logout } from '../../store/slices/authSlice';
import logo from '../../assets/images/logo.png';
import navLogo from '../../assets/images/navLogo2.png';
import cameraImg from '../../assets/images/camera-img.png';
import homePic from '../../assets/images/home.png';
import profilePic from '../../assets/images/profile.png';
import './Layout.css';

export default function Layout() {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
    };

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
                            <Link to='/customize-profile'>
                                <li>
                                    <img src={profilePic} alt="profilePic" /> Profile
                                </li>
                            </Link>
                            <Link to='' onClick={handleLogout}>
                                <li className='logout flex'>
                                    <RiLogoutCircleLine style={{ marginRight: '0.5em', fontSize: '1.25rem' }} /> Logout
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
                            <Link to='/'><img src={logo} alt="logo" /></Link>
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
