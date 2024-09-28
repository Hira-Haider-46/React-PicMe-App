import React from 'react';
import Button from '../../commonComponents/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setRole } from '../../features/authSlice';
import './ContinueAsPage.css';

export default function ContinueAsPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRoleSelection = (role) => {
        dispatch(setRole(role)); 
        navigate('/login'); 
    };

    return (
        <div className="text flex">
            <h1>Experience Photography In a new Dimension</h1>

            <Button
                text="CONTINUE AS CUSTOMER"
                styles={{ backgroundColor: '#2BAFC7', color: 'white', border: '1px solid #2BAFC7' }}
                onClick={() => handleRoleSelection(0)} 
            />

            <Button
                text="CONTINUE AS PHOTOGRAPHER"
                styles={{ backgroundColor: 'white', color: '#2BAFC7', border: '1px solid #2BAFC7' }}
                onClick={() => handleRoleSelection(1)}
            />
        </div>
    );
}