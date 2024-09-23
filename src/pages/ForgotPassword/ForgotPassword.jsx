import React from 'react';
import { FaRegEnvelope } from "react-icons/fa6";
import Button from '../../commonComponents/Button';
import './ForgotPassword.css';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
    return (
        <div className='login forgot-pass'>
            <h2>Forgot Password?</h2>
            <p>Please enter your email address to request a password reset</p>
            <div className="input-group">
                <FaRegEnvelope />
                <input type="email" placeholder="abc@email.com" required />
            </div>
            <Link to='/verification'>
                <Button text='CONTINUE' styles={{ backgroundColor: '#2BAFC7', color: 'white', border: 'none' }} />
            </Link>
            <Link to='/login'>
                <Button text='BACK TO LOGIN' styles={{ backgroundColor: 'white', color: '#2BAFC7', border: '1px solid #2BAFC7' }} />
            </Link>
        </div>
    )
}