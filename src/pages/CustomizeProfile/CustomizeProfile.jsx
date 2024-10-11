import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../commonComponents/Button';
import Input from '../../commonComponents/Input';
import profile from '../../assets/images/profileImg.png';
import editProfile from '../../assets/images/editProfile.png';
import { EDIT_PROFILE } from '../../apis/apiUrls';
import { patchApiWithAuth } from '../../apis/index';
import './CustomizeProfile.css';

export default function CustomizeProfile() {
    const user = useSelector(state => state.auth.user);
    console.log('user', user);

    const [showPasswordFields, setShowPasswordFields] = useState({password: false, confirmPassword: false, currentPassword: false});
    const initialFormValues = { firstName: '', lastName: '', password: '', confirmPassword: '', currentPassword: '' };

    const [formValues, setFormValues] = useState(initialFormValues);
    const [errors, setErrors] = useState({});
    const nameRegex = /^[a-zA-Z0-9_ ]*$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const validateField = (name, value) => {
        let error = '';
        if (name === 'firstName' || name === 'lastName') {
            if (value && !nameRegex.test(value)) {
                error = 'Name can only contain letters, numbers, and underscores';
            }
        } else if (name === 'password') {
            if (value && !passwordRegex.test(value)) {
                error = 'Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters';
            } else if (value === formValues.currentPassword) {
                error = 'New password must be different from the current password';
            }
        } else if (name === 'confirmPassword') {
            if (value && value !== formValues.password) {
                error = 'Passwords do not match';
            }
        } else if (name === 'currentPassword' && !value && (formValues.password || formValues.confirmPassword)) {
            error = 'Please enter your current password';
        }

        return error;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
        const error = validateField(name, value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
        }));
    };

    const handleTogglePassword = (fieldName) => {
        setShowPasswordFields((prevState) => ({
            ...prevState,
            [fieldName]: !prevState[fieldName]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('formValues', formValues);
    };

    return (
        <div className='customize-profile border'>
            <div className='bio'>
                <div className='bio-img'>
                    <img src={user?.profile_image_url ? user.profile_image_url : profile} alt="profile-img" />
                    <img src={editProfile} alt="profile-edit" />
                </div>
                <h1>{user?.first_name} {user?.last_name}</h1>
                <p>{user?.email}</p>
            </div>
            <div className='border input-form'>
                <h2 className='h2'>Customize Your Profile</h2>
                <form className='profile-form' onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <input type="email" name="email" value={user?.email} placeholder="abc@email.com" className='form-input' disabled />
                    </div>

                    <Input type="text" name="firstName" placeholder="First name" value={formValues.firstName} onChange={handleInputChange} error={errors.firstName} />

                    <Input type="text" name="lastName" placeholder="Last name" value={formValues.lastName} onChange={handleInputChange} error={errors.lastName} />

                    <Input type="password" name="currentPassword" placeholder="Current Password" value={formValues.currentPassword} onChange={handleInputChange} error={errors.currentPassword} showPassword={showPasswordFields.currentPassword} toggleShowPassword={() => handleTogglePassword('currentPassword')} />

                    <Input type="password" name="password" placeholder="New Password" value={formValues.password} onChange={handleInputChange} error={errors.password} showPassword={showPasswordFields.password} toggleShowPassword={() => handleTogglePassword('password')} />

                    <Input type="password" name="confirmPassword" placeholder="Confirm Password" value={formValues.confirmPassword} onChange={handleInputChange} error={errors.confirmPassword} showPassword={showPasswordFields.confirmPassword} toggleShowPassword={() => handleTogglePassword('confirmPassword')} />

                    <div className='buttons flex'>
                        <Button text='UPDATE' variant='fill' />
                        <Button text='CANCEL' variant='empty' />
                    </div>
                </form>
            </div>
        </div>
    );
}