import React from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import Button from '../Button';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import './ProfileLayout.css';

export default function ProfileLayout() {

    const location = useLocation();
    const photographer = location.state?.photographer;

    const activeStyles = {
        fontWeight: "bold",
        color: "#2BAFC7",
        borderBottom: "2px solid #2BAFC7"
    }

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

            <nav className="layout-nav flex">
                <div>
                    <NavLink end to="." style={({ isActive }) => isActive ? activeStyles : null}>
                        Photos
                        <span><MdOutlineKeyboardArrowDown /></span>
                    </NavLink>
                    <NavLink to="videos" style={({ isActive }) => isActive ? activeStyles : null}>
                        Videos
                        <span><MdOutlineKeyboardArrowDown /></span>
                    </NavLink>
                    <NavLink to="reviews" style={({ isActive }) => isActive ? activeStyles : null}>
                        Reviews
                        <span><MdOutlineKeyboardArrowDown /></span>
                    </NavLink>
                </div>
                <div>
                    <NavLink to="category" style={({ isActive }) => isActive ? activeStyles : null}>
                        Category
                        <span><MdOutlineKeyboardArrowDown /></span>
                    </NavLink>
                </div>
            </nav>
            <Outlet />
        </div>
    )
}