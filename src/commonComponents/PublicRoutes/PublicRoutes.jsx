import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function PublicRoutes() {
    const type = localStorage.getItem('type');
    const token = localStorage.getItem('token');
    const profileCreated = localStorage.getItem('profileCreated');

    if (token) {
        return <Navigate to={type === 0 ? "/choose-location" : (profileCreated ? '/create-profile' : '/home-page')} />;
    }
    
    return <Outlet />;
}