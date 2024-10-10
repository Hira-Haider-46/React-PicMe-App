import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function CustomerPrivateRoutes() {
    const token = localStorage.getItem('token');
    const user = useSelector(state => state.auth.user);
    const type = user?.type;
    const profileCreated = user?.profile_created;

    if (!token) {
        return <Navigate to="/" />;
    }

    if (type === 1) {
        return <Navigate to={profileCreated ? '/create-profile' : '/home-page'} />;
    }

    return <Outlet />;
}