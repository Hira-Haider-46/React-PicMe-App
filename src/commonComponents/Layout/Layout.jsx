import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import navLogo from '../../assets/images/navLogo2.png';
import './Layout.css';

export default function Layout() {
    const location = useLocation(); 

    return (
        <div className='customer-layout flex'>
            <nav className='navbar flex'>
                {/* {
                    location.pathname === '/choose-location'
                        ? <Link to='/choose-location'><img src={logo} alt="logo" /></Link>
                        :
                        <> */}
                            <Link to='/choose-location'><img src={navLogo} alt="navLogo" /></Link>
                            <ul className='flex'>
                                <li>Home</li>
                                <li>Chats</li>
                                <li>Profile</li>
                            </ul>
                        {/* </>
                } */}
            </nav>
            <div className='padding'>
                <Outlet />
            </div>
        </div>
    );
}
    // import React from 'react';
    // import { Link, Outlet } from 'react-router-dom';
    // import cameraImg from '../../assets/images/camera-img.png';
    // import logo from '../../assets/images/logo.png';
    // import './Layout.css';
    
    // export default function Layout() {
    //     return (
    //         <div className='layout flex'>
    //             <div className='text-portion'>
    //                 <nav>
    //                     <Link to='/'><img src={logo} alt="logo" /></Link>
    //                 </nav>
    //                 <Outlet />
    //             </div>
    //             <div className="img-portion flex">
    //                 <img src={cameraImg} alt="camera-img" />
    //             </div>
    //         </div>
    //     )
    // }