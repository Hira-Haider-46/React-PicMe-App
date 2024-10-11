import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from '../../../commonComponents/Button';
import { EDIT_PROFILE } from '../../../apis/apiUrls';
import { patchApiWithAuth } from '../../../apis/index';
import './CustomerForm.css';

export default function CustomerForm({ email, id }) {
    const initialFormValues = {
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        currentPassword: '',
        profile_image: null,
    };

    const [formValues, setFormValues] = useState(initialFormValues);
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        currentPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);

    const nameRegex = /^[a-zA-Z0-9_ ]*$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'firstName':
            case 'lastName':
                if (value && !nameRegex.test(value)) {
                    error = 'Name can only contain letters, numbers, and underscores';
                }
                break;
            case 'password':
                if (value && !passwordRegex.test(value)) {
                    error = 'Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters';
                }
                break;
            case 'confirmPassword':
                if (value && value !== formValues.password) {
                    error = 'Passwords do not match';
                }
                break;
            case 'currentPassword':
                if (value && !value) {
                    error = 'Please enter your current password';
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormValues({
            ...formValues,
            profile_image: file,
        });
    };

    const validateForm = () => {
        const validationErrors = {};
        if (formValues.firstName && !nameRegex.test(formValues.firstName)) {
            validationErrors.firstName = 'First name can only contain letters, numbers and underscores';
        }

        if (formValues.lastName && !nameRegex.test(formValues.lastName)) {
            validationErrors.lastName = 'Last name can only contain letters, numbers and underscores';
        }

        if (formValues.password && !passwordRegex.test(formValues.password)) {
            validationErrors.password = 'Password must have at least 8 characters, including uppercase, lowercase, numbers, and special characters';
        }

        if (formValues.confirmPassword && formValues.password !== formValues.confirmPassword) {
            validationErrors.confirmPassword = 'Passwords do not match';
        }

        if (formValues.currentPassword && !formValues.currentPassword) {
            validationErrors.currentPassword = 'Please enter your current password';
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
        const formData = new FormData();
        if (formValues.currentPassword) {
            formData.append("user[current_password]", formValues.currentPassword);
        }
        if (formValues.firstName) {
            formData.append("user[first_name]", formValues.firstName);
        }
        if (formValues.lastName) {
            formData.append("user[last_name]", formValues.lastName);
        }
        if (formValues.password) {
            formData.append("user[password]", formValues.password);
        }
        if (formValues.profile_image) {
            formData.append("user[profile_image]", formValues.profile_image);
        }

        try {
            const res = await patchApiWithAuth(`${EDIT_PROFILE}${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (res.success) {
                console.log('Profile updated successfully');
            } else {
                if (res.data && res.data.message === 'Password does not match') {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        currentPassword: 'Incorrect current password'
                    }));
                } else {
                    console.error(res.data);
                }
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const toggleShowCurrentPassword = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };

    const handleCancel = (e) => {
        e.preventDefault();
        setFormValues(initialFormValues);
        setErrors(initialFormValues);
        setShowPassword(false);
        setShowConfirmPassword(false);
        setShowCurrentPassword(false);
    };

    const isFormFilled = Object.values(formValues).some(value => value !== '' || value !== null);

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
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    className='form-input'
                    value={formValues.firstName}
                    onChange={handleInputChange}
                />
                {errors.firstName && <span className='error-message'>{errors.firstName}</span>}
            </div>

            <div className='form-group'>
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    className='form-input'
                    value={formValues.lastName}
                    onChange={handleInputChange}
                />
                {errors.lastName && <span className='error-message'>{errors.lastName}</span>}
            </div>

            <div className='form-group'>
                <div className='input-group flex pass'>
                    <input
                        type={showCurrentPassword ? "text" : "password"}
                        name="currentPassword"
                        placeholder="Current Password"
                        value={formValues.currentPassword}
                        onChange={handleInputChange}
                    />
                    <div onClick={toggleShowCurrentPassword}>
                        {showCurrentPassword ? <FaEye /> : <FaEyeSlash />}
                    </div>
                </div>
                {errors.currentPassword && <span className='error-message'>{errors.currentPassword}</span>}
            </div>

            <div className='form-group'>
                <div className='input-group flex pass'>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="New password"
                        value={formValues.password}
                        onChange={handleInputChange}
                    />
                    <div onClick={toggleShowPassword}>
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </div>
                </div>
                {errors.password && <span className='error-message'>{errors.password}</span>}
            </div>

            <div className='form-group'>
                <div className='input-group flex pass'>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm new Password"
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
                    type="file"
                    name="profile_image"
                    className='form-input'
                    onChange={handleImageChange}
                />
            </div>

            <div className='buttons flex'>
                <Button text='UPDATE' variant='fill' disabled={!isFormFilled} />
                <Button text='CANCEL' variant='empty' onClick={handleCancel} />
            </div>
        </form>
    );
}