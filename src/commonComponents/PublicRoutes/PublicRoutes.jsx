import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function PublicRoutes() {
    const token = localStorage.getItem('token');
    if (token) {
        return <Navigate to="/choose-location" />; 
    }
    return <Outlet />;  
}