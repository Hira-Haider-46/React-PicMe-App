import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import navLogo1 from '../../assets/images/logo.png';
import navLogo2 from '../../assets/images/navLogo2.png';
import './PhotographerLayout.css';

export default function PhotographerLayout() {

  const location = useLocation();
  const currentURL = location.pathname;

  return (
    <>
      <nav className='photographer-nav nav'>
        {(currentURL === '/create-profile' || currentURL === '/profile-page') &&
          <img src={navLogo1} alt="logo" />
        }
        {(currentURL !== '/create-profile' && currentURL !== '/profile-page') &&
          <Link to='/home-page'>
            <img src={navLogo2} alt="logo" />
          </Link>
        }
      </nav>
      <div className='padding'>
        <Outlet />
      </div>
    </>
  );
}