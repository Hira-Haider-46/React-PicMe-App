import React from 'react';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { NavLink, useLocation } from 'react-router-dom';
import './LayoutNav.css';

export default function LayoutNav({ selectedTab }) {
    const location = useLocation();

    const activeStyles = {
        fontWeight: "bold",
        color: "#2BAFC7",
        borderBottom: "2px solid #2BAFC7",
    };

    if (selectedTab === 'package') {
        return (
            <nav className="layout-nav flex">
                <div>
                    <NavLink to="choose-package" style={ {borderBottom: "2px solid #2BAFC7", color: '#2BAFC7' }}>
                        Choose Package
                    </NavLink>
                </div>
            </nav>
        );
    }

    return (
        <nav className="layout-nav flex">
            <div>
                <NavLink end to="." style={({ isActive }) => (isActive ? activeStyles : null)}>
                    Photos
                    <span>
                        <MdOutlineKeyboardArrowDown />
                    </span>
                </NavLink>
                <NavLink to="videos" style={({ isActive }) => (isActive ? activeStyles : null)}>
                    Videos
                    <span>
                        <MdOutlineKeyboardArrowDown />
                    </span>
                </NavLink>
                <NavLink to="reviews" style={({ isActive }) => (isActive ? activeStyles : null)}>
                    Reviews
                    <span>
                        <MdOutlineKeyboardArrowDown />
                    </span>
                </NavLink>
            </div>
            {location.pathname !== '/photographer-profile/reviews' && (
                <div>
                    <NavLink to="category" style={({ isActive }) => (isActive ? activeStyles : null)}>
                        Category
                        <span>
                            <MdOutlineKeyboardArrowDown />
                        </span>
                    </NavLink>
                </div>
            )}
        </nav>
    );
}