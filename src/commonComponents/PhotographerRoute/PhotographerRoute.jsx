import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PhotographerRoute() {
    const token = localStorage.getItem('token');
    const user = useSelector(state => state.auth.user);
    const type = user?.type;

    if (!token) {
        return <Navigate to="/" />;
    }

    if (type === 0) {
        return <Navigate to="/choose-location" />;
    }

    return <Outlet />;
}