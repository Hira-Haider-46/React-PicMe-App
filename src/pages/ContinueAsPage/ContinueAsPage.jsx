import React from 'react';
import Button from '../../commonComponents/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setType } from '../../store/slices/authSlice';
import './ContinueAsPage.css';

export default function ContinueAsPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRoleSelection = (type) => {
        dispatch(setType(type)); 
        localStorage.setItem('type', type);
        navigate('/login'); 
    };

    return (
        <div className="text flex">
            <h1>Experience Photography In a New Dimension</h1>
            <Button
                text="CONTINUE AS CUSTOMER"
                variant='fill'
                onClick={() => handleRoleSelection('0')} 
            />
            <Button
                text="CONTINUE AS PHOTOGRAPHER"
                variant='empty'
                onClick={() => handleRoleSelection('1')} 
            />
        </div>
    );
}