import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function CustomerPrivateRoutes() {
    const token = localStorage.getItem('token');
    const type = localStorage.getItem('type');
    const profileCreated = localStorage.getItem('profileCreated');

    if (!token) {
        return <Navigate to="/" />;
    }

    if (type === 1) {
        return <Navigate to={profileCreated ? '/create-profile' : '/home-page'} />;
    }
    
    return <Outlet />;
}