import React from 'react';
import logo from '../../assets/images/create-profile.png';
import './CreateProfile.css';
import Button from '../../commonComponents/Button';

export default function CreateProfile() {
    return (
        <div className='create-profile-card'>
            <img src={logo} alt="create-profile-logo" />
            <h2>Create Your Profile</h2>
            <p>Create your profile to showcase stunning photography and attract clients.</p>
            <Button text='CREATE PROFILE' variant='fill'/>
        </div>
    )
}