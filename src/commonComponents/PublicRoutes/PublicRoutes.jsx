import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PublicRoutes() {

    const token = localStorage.getItem('token');
    const user = useSelector(state => state.auth.user);
    const type = user?.type;
    const profileCreated = user?.profile_created;
    console.log('profileCreated public, type of type', profileCreated, typeof(type))
    
    if (token && type === 0) {
        return <Navigate to="/choose-location" />;
    }

    if (token && type === 1) {
        return <Navigate to={profileCreated ? '/home-page' : '/create-profile'} />
    }

    return <Outlet />;
}