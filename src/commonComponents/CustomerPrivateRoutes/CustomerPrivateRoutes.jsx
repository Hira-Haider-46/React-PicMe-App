import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function CustomerPrivateRoutes() {
    const token = localStorage.getItem('token');
    const type = localStorage.getItem('type');

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (type === 1) {
        return <Navigate to="/create-profile" />;
    }
    
    return <Outlet />;
}