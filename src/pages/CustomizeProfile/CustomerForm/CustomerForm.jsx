import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
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

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const nameRegex = /^[a-zA-Z0-9_ ]*$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'fullName':
                if (!nameRegex.test(value)) {
                    error = 'Name can only contain letters, numbers and underscores';
                }
                break;
            case 'password':
                if (!passwordRegex.test(value)) {
                    error = 'Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters';
                }
                break;
            case 'confirmPassword':
                if (value !== formValues.password) {
                    error = 'Passwords do not match';
                }
                break;
            default:
                break;
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
        validateField(name, value);
    };

    const validateForm = () => {
        const validationErrors = {};
        if (!nameRegex.test(formValues.fullName)) {
            validationErrors.fullName = 'Name can only contain letters, numbers and underscores';
        }

        if (!passwordRegex.test(formValues.password)) {
            validationErrors.password = 'Password must have atleast 8 characters, including uppercase, lowercase, numbers, and special characters';
        }

        if (formValues.password !== formValues.confirmPassword) {
            validationErrors.confirmPassword = 'Passwords do not match';
        }

        return validationErrors;
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
        const payload = {
            user: {
                fullName: formValues.fullName,
                password: formValues.password
                // profile_image: formValues.profile_image 
            }
        };
        const res = await patchApiWithAuth(`${EDIT_PROFILE}${id}`, {payload});
        if (res.success) {
            console.log('Profile updated successfully');
        } else {
            console.error(res.data);
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
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
                <div className='input-group flex pass'>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formValues.confirmPassword}
                        onChange={handleInputChange}
                    />
                    <div onClick={toggleShowConfirmPassword}>
                        {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                    </div>
                </div>
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
                <div className='input-group flex pass'>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Your password"
                        value={formValues.password}
                        onChange={handleInputChange}
                    />
                    <div onClick={toggleShowPassword}>
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </div>
                </div>
                {errors.password && <span className='error-message'>{errors.password}</span>}
            </div>
            <div className='buttons flex'>
                <Button text='UPDATE' variant='fill' />
                <Button text='CANCEL' variant='empty' />
            </div>
        </form>
    );
}