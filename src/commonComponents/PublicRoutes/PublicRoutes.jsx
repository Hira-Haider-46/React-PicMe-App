import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function PublicRoutes() {
    const type = localStorage.getItem('type');
    const token = localStorage.getItem('token');

    if (token) {
        return <Navigate to={type === 0 ? "/choose-location" : '/create-profile'} />;
    }
    
    return <Outlet />;
}