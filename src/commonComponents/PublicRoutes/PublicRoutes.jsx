import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function PublicRoutes() {
    const type = localStorage.getItem('type');
    const token = localStorage.getItem('token');
    const profileCreated = localStorage.getItem('profileCreated');
    console.log('type public route', type);

    if (token) {
        console.log('type public route if condition', type);
        // return <Navigate to={type === 0 ? "/choose-location" : (profileCreated ? '/create-profile' : '/home-page')} />;
        return <Navigate to={type === 0 ? "/choose-location" : '/create-profile'} />;
    }

    console.log('type public route outside if condition', type);
    return <Outlet />;
}