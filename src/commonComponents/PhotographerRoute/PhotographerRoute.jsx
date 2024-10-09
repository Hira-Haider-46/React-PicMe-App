import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function PhotographerRoute() {
    const token = localStorage.getItem('token');
    const type = localStorage.getItem('type');
    const profileCreated = localStorage.getItem('profileCreated');

    if (!token) {
        return <Navigate to="/" />;
    }

    if (type === 0) {
        return <Navigate to="/choose-location" />;
    }

    if (profileCreated) {
        return <Navigate to="/home-page" />;
    }

    return <Outlet />;
}