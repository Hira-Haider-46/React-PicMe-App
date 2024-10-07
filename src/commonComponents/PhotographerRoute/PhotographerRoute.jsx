import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function PhotographerRoute() {
    const token = localStorage.getItem('token');
    const type = localStorage.getItem('type');

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (type === 0) {
        return <Navigate to="/choose-location" />;
    }

    return <Outlet />;
}