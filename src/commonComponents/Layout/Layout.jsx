import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import cameraImg from '../../assets/images/camera-img.png';
import logo from '../../assets/images/logo.png';
import './Layout.css';

export default function Layout() {
    return (
        <div className='layout'>
            <div className='text-portion'>
                <nav>
                    <Link to='/'><img src={logo} alt="logo" /></Link>
                </nav>
                <Outlet />
            </div>
            <div className="img-portion">
                <img src={cameraImg} alt="camera-img" />
            </div>
        </div>
    )
}
