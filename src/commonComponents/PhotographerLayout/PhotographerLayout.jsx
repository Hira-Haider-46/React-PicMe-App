import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RiLogoutCircleLine } from "react-icons/ri";
import navLogo1 from '../../assets/images/logo.png';
import navLogo2 from '../../assets/images/navLogo2.png';
import homePic from '../../assets/images/home.png';
import chatPic from '../../assets/images/chat.png';
import profilePic from '../../assets/images/profile.png';
import transactionHistory from '../../assets/images/transaction_history.png';
import { logout } from '../../store/slices/authSlice';
import './PhotographerLayout.css';

export default function PhotographerLayout() {

  const location = useLocation();
  const currentURL = location.pathname;
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    localStorage.removeItem('type');
    localStorage.removeItem('pkgId');
  };

  return (
    <>
      <nav className={(currentURL === '/create-profile' || currentURL === '/profile-page') ? 'nav' : 'navbar flex'}>
        {(currentURL === '/create-profile' || currentURL === '/profile-page') &&
          <img src={navLogo1} alt="logo" />
        }
        {(currentURL !== '/create-profile' && currentURL !== '/profile-page') &&
          <>
            <Link to='/home-page'>
              <img src={navLogo2} alt="logo" />
            </Link>
            <ul className='flex'>
              <Link to='/home-page'>
                <li>
                  <img src={homePic} alt="homePic" /> Home
                </li>
              </Link>
              {/* <Link to=''>
                <li>
                  <img src={chatPic} alt="chatPic" /> Chats
                </li>
              </Link>
              <Link to=''>
                <li>
                <img src={transactionHistory} alt="chatPic" /> Transaction History
                </li>
              </Link> */}
              <Link to=''>
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
          </>
        }
      </nav>
      <div className='padding'>
        <Outlet />
      </div>
    </>
  );
}