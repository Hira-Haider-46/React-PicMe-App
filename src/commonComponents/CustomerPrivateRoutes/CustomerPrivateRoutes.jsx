import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function CustomerPrivateRoutes() {
    const token = localStorage.getItem('token');
    const type = localStorage.getItem('type');
    const profileCreated = localStorage.getItem('profileCreated');
    console.log('type customer layout', type);

    if (!token) {
        return <Navigate to="/" />;
    }

    if (type === 1) {
        console.log('type-------------',type)
        return <Navigate to={profileCreated ? '/create-profile' : '/home-page'} />;
    }
    console.log('type 0-------------', type)

    return <Outlet />;
}