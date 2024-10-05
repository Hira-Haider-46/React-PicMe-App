import React from 'react';
import { Outlet } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './PhotographerLayout.css';

export default function PhotographerLayout() {
  return (
    <>
      <nav className='photographer-nav nav'>
        <img src={logo} alt="logo" />
      </nav>
      <div className='padding'>
        <Outlet />
      </div>
    </>
  );
}