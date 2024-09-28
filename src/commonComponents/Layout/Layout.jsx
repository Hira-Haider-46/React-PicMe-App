import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import navLogo from '../../assets/images/navLogo2.png';
import cameraImg from '../../assets/images/camera-img.png';
import homePic from '../../assets/images/home.png';
import chatPic from '../../assets/images/chat.png';
import profilePic from '../../assets/images/profile.png';
import './Layout.css';

export default function Layout() {

    const token = localStorage.getItem('token');

    return (
        <>
            {token ?
                <div className='customer-layout flex'>
                    <nav className='navbar flex'>
                        <Link to='/'><img src={navLogo} alt="navLogo" /></Link>
                        <ul className='flex'>
                            <Link to='/'>
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
                        </ul>
                    </nav>
                    <div className='padding'>
                        <Outlet />
                    </div>
                </div>

                :

                < div className='layout flex' >
                    <div className='text-portion'>
                        <nav className='nav'>
                            <Link to='/'><img src={logo} alt="logo" /></Link>
                        </nav>
                        <Outlet />
                    </div>
                    <div className="img-portion flex">
                        <img src={cameraImg} alt="camera-img" />
                    </div>
                </div >
            }
        </>
    );
}