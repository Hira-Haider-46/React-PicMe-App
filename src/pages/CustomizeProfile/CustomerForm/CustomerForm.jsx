import React, { useState } from 'react';
import Button from '../../../commonComponents/Button';
import { EDIT_PROFILE } from '../../../apis/apiUrls';
import { patchApiWithAuth } from '../../../apis/index';
import './CustomerForm.css';

export default function CustomerForm({ email, id }) {
    const [formValues, setFormValues] = useState({
        fullName: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({
        fullName: '',
        password: '',
        confirmPassword: '',
    });

    const handleInputChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        const errors = {};
        const nameRegex = /^[a-zA-Z0-9_ ]*$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!nameRegex.test(formValues.fullName)) {
            errors.fullName = 'Name can only contain letters, numbers, underscores, and spaces';
        }

        if (!passwordRegex.test(formValues.password)) {
            errors.password = 'Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters';
        }

        if (formValues.password !== formValues.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        return errors;
    };

    const handleEditProfile = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            editProfile();
        }
    };

    const editProfile = async () => {
        const res = await patchApiWithAuth(`${EDIT_PROFILE}${id}`, {
            fullName: formValues.fullName,
            password: formValues.password,
        });
        if (res.success) {
            console.log('Profile updated successfully');
        } else {
            console.error(res.data);
        }
    };

    return (
        <form className='profile-form' onSubmit={handleEditProfile}>
            <div className='form-group'>
                <input
                    type="email"
                    name="email"
                    value={email}
                    placeholder="abc@email.com"
                    className='form-input'
                    disabled
                />
            </div>
            <div className='form-group'>
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className='form-input'
                    value={formValues.confirmPassword}
                    onChange={handleInputChange}
                />
                {errors.confirmPassword && <span className='error-message'>{errors.confirmPassword}</span>}
            </div>
            <div className='form-group'>
                <input
                    type="text"
                    name="fullName"
                    placeholder="Full name"
                    className='form-input'
                    value={formValues.fullName}
                    onChange={handleInputChange}
                />
                {errors.fullName && <span className='error-message'>{errors.fullName}</span>}
            </div>
            <div className='form-group'>
                <input
                    type="password"
                    name="password"
                    placeholder="Your password"
                    className='form-input'
                    value={formValues.password}
                    onChange={handleInputChange}
                />
                {errors.password && <span className='error-message'>{errors.password}</span>}
            </div>
            <div className='buttons flex'>
                <Button text='UPDATE' variant='fill' />
                <Button text='CANCEL' variant='empty' />
            </div>
        </form>
    );
}