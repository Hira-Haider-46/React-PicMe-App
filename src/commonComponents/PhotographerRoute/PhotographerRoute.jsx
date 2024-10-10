import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function PhotographerRoute() {
    const token = localStorage.getItem('token');
    const type = localStorage.getItem('type');
    const profileCreated = localStorage.getItem('profileCreated');

    if (!token) {
        return <Navigate to="/" />;
    }

    if (Number(type) === 0) {
        console.log("in if---", type)
        return <Navigate to="/choose-location" />;
    }

    if (profileCreated) {
        console.log("in profileCreated---", profileCreated, type)
        return <Navigate to="/home-page" />;
    }

    console.log("in elsee---", profileCreated, type, typeof type)


    return <Outlet />;
}