import React, { useState } from 'react';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { NavLink, useLocation } from 'react-router-dom';
import './Portfolio.css';

export default function Portfolio({ }) {
  const location = useLocation();
  const [navbarTab, setNavbarTab] = useState('photos');

  const activeStyles = {
    fontWeight: "bold",
    color: "#2BAFC7",
    borderBottom: "2px solid #2BAFC7",
  };

  return (
    <>
      < nav className="layout-nav flex">
        <div>
          <NavLink style={({ isActive }) => (isActive ? activeStyles : null)}>
            Photos
            <span>
              <MdOutlineKeyboardArrowDown />
            </span>
          </NavLink>
          <NavLink to="" style={({ isActive }) => (isActive ? activeStyles : null)}>
            Videos
            <span>
              <MdOutlineKeyboardArrowDown />
            </span>
          </NavLink>
          <NavLink to="" style={({ isActive }) => (isActive ? activeStyles : null)}>
            Reviews
            <span>
              <MdOutlineKeyboardArrowDown />
            </span>
          </NavLink>
        </div>
        {location.pathname !== '/photographer-profile/reviews' && (
          <div>
            <NavLink to="" style={({ isActive }) => (isActive ? activeStyles : null)}>
              Category
              <span>
                <MdOutlineKeyboardArrowDown />
              </span>
            </NavLink>
          </div>
        )}
      </nav >
    </>
  )
}