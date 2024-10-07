import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/create-profile.png';
import Button from '../../../commonComponents/Button';
import './CreateProfile.css';

export default function CreateProfile() {
    return (
        <div className='create-profile-card'>
            <img src={logo} alt="create-profile-logo" />
            <h2>Create Your Profile</h2>
            <p>Create your profile to showcase stunning photography and attract clients.</p>
            <Link to='/profile-page'>
                <Button text='CREATE PROFILE' variant='fill' />
            </Link>
        </div>
    )
}