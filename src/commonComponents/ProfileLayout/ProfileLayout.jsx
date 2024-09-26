import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import Button from '../Button';
import './ProfileLayout.css';

export default function ProfileLayout() {

    const location = useLocation();
    const photographer = location.state?.photographer;

    return (
        <div className='photographer-profile flex'>
            <div className='header flex'>
                <img src={photographer.profileImg} alt="profile-img" />
                <h2>{photographer.name}</h2>
                <p>{photographer.profeciency}</p>
                <p>
                    <span><FaStar /></span>
                    <span>{photographer.rating}</span>
                    <span>({photographer.NoOfreviews} reviews)</span>
                </p>
                <div className='btns flex'>
                    <Link to=''>
                        <Button text='Portfolio' styles={{ backgroundColor: '#2BAFC7', color: 'white', border: '1.5px solid' }} />
                    </Link>
                    <Link to=''>
                        <Button text='Package' styles={{ backgroundColor: 'white', color: '#2BAFC7', border: '1.5px solid #2BAFC7' }} />
                    </Link>
                </div>
            </div>
            <Outlet />
        </div>
    )
}


// import React from 'react';
// import { NavLink } from "react-router-dom";
// import { Outlet } from 'react-router-dom';
// import './HostLayout.css';

// function HostLayout() {
//     const activeStyles = {
//         fontWeight: "bold",
//         textDecoration: "underline",
//         color: "#161616"
//     }

//     return (
//         <>
//             <nav className="host-nav">
//                 <NavLink end to="." style={({ isActive }) => isActive ? activeStyles : null}>Dashboard</NavLink>
//                 <NavLink to="income" style={({ isActive }) => isActive ? activeStyles : null}>Income</NavLink>
//                 <NavLink to="vans" style={({ isActive }) => isActive ? activeStyles : null}>Vans</NavLink>
//                 <NavLink to="reviews" style={({ isActive }) => isActive ? activeStyles : null}>Reviews</NavLink>
//             </nav>
//             <Outlet />
//         </>
//     )
// }