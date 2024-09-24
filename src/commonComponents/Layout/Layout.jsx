import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import navLogo from '../../assets/images/navLogo2.png';
import cameraImg from '../../assets/images/camera-img.png';
import './Layout.css';

export default function Layout() {

    const token = localStorage.getItem('token');

    return (
        <>
            { !token ?
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

                :

                <div className='customer-layout flex'>
                    <nav className='navbar flex'>
                        <Link to='/choose-location'><img src={navLogo} alt="navLogo" /></Link>
                        <ul className='flex'>
                            <li>Home</li>
                            <li>Chats</li>
                            <li>Profile</li>
                        </ul>
                    </nav>
                    <div className='padding'>
                        <Outlet />
                    </div>
                </div>
            }
        </>
    );
}