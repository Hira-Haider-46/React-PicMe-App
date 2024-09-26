import React from 'react';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import './LayoutNav.css';

export default function LayoutNav() {
    const activeStyles = {
        fontWeight: "bold",
        color: "#2BAFC7",
        borderBottom: "2px solid #2BAFC7",
    };

    return (
        <nav className="layout-nav flex">
            <div>
                <NavLink end to="photos" style={({ isActive }) => (isActive ? activeStyles : null)}>
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
            <div>
                <NavLink to="category" style={({ isActive }) => (isActive ? activeStyles : null)}>
                    Category
                    <span>
                        <MdOutlineKeyboardArrowDown />
                    </span>
                </NavLink>
            </div>
        </nav>
    );
}