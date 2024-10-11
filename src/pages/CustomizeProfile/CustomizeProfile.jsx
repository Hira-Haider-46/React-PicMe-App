import React from 'react';
import { useSelector } from 'react-redux';
import profile from '../../assets/images/profileImg.png';
import editProfile from '../../assets/images/editProfile.png';
import CustomerForm from './CustomerForm';
import PhotographerForm from './PhotographerForm';
import './CustomizeProfile.css';

export default function CustomizeProfile() {
    const user = useSelector(state => state.auth.user);
    console.log('user', user);

    return (
        <div className='customize-profile border'>
            <div className='bio'>
                <div className='bio-img'>
                    <img src={user?.profile_image_url ? user.profile_image_url : profile} alt="profile-img" />
                    <img src={editProfile} alt="profile-edit" />
                </div>
                <h1>{user?.first_name} {user?.last_name}</h1>
                <p>{user?.email }</p>
            </div>
            <div className='border input-form'>
                <h2 className='h2'>Customize Your Profile</h2>
                {user?.type === 0 ? <CustomerForm email={user?.email} id={user?.id} /> : <PhotographerForm />}
            </div>
        </div>
    )
}