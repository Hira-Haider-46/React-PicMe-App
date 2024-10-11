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
    console.log('user profile', user);
    const initialFormValues = {
        firstName: user?.first_name || '',
        lastName: user?.last_name || '',
        password: '',
        confirmPassword: '',
        currentPassword: '',
    };

    const [profileImage, setProfileImage] = useState(user?.profile_image_url ? user.profile_image_url : profile);
    const [formValues, setFormValues] = useState(initialFormValues);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);

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

    const validateForm = () => {
        const validationErrors = {};
        Object.keys(formValues).forEach((field) => {
            const error = validateField(field, formValues[field]);
            if (error) {
                validationErrors[field] = error;
            }
        });
        return validationErrors;
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

    const handleEditProfile = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            const formData = new FormData();

            if (formValues.password) {
                if (!formValues.currentPassword) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        currentPassword: 'Current password is required when changing password',
                    }));
                    return;
                }
                formData.append("user[current_password]", formValues.currentPassword);
                formData.append("user[password]", formValues.password);
            }

            formData.append("user[first_name]", formValues.firstName);
            formData.append("user[last_name]", formValues.lastName);

            if (profileImage && typeof profileImage === 'string' && profileImage.startsWith('blob:')) {
                formData.append("user[profile_image]", profileImage);
            } else {
                console.warn("Profile image should be a file object.");
            }

            // console.log('formData before sending:', formData.getAll());
            // console.log(formData)
            try {
                const res = await patchApiWithAuth(`${EDIT_PROFILE}${user.id}`, formData);
                if (res.success) {
                    console.log('Profile updated successfully');
                    handleCancel();
                } else {
                    handleApiError(res);
                }
            } catch (error) {
                console.error('Error updating profile:', error);
            }
        } else {
            console.warn("Validation errors:", validationErrors);
        }
    };

    const handleApiError = (res) => {
        if (res.data?.message === 'Password does not match') {
            setErrors((prevErrors) => ({
                ...prevErrors,
                currentPassword: 'Incorrect current password'
            }));
        } else {
            console.error(res.data);
        }
    };

    const toggleShowPassword = () => setShowPassword((prev) => !prev);
    const toggleShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);
    const toggleShowCurrentPassword = () => setShowCurrentPassword((prev) => !prev);

    const handleCancel = (e) => {
        if (e) e.preventDefault();
        setFormValues(initialFormValues);
        setErrors({});
        setProfileImage(user?.profile_image_url || profile);
        setShowPassword(false);
        setShowConfirmPassword(false);
        setShowCurrentPassword(false);
    };

    const isFormFilled = Object.values(formValues).some(value => value !== '') || profileImage !== profile;

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
            setFormValues((prevValues) => ({
                ...prevValues,
                profile_image: file,
            }));
            setErrors({});
        }
    };


    return (
        <div className='customize-profile border'>
            <div className='bio'>
                <div>
                    <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} id="profileImageUpload" />
                    <div className='bio-img'>
                        <label htmlFor="profileImageUpload">
                            <img src={profileImage} alt="profile-img" />
                            <img src={editProfile} alt="profile-edit" />
                        </label>
                    </div>
                </div>
                <h1>{user?.first_name} {user?.last_name}</h1>
                <p>{user?.email}</p>
            </div>
            <div className='border input-form'>
                <h2 className='h2'>Customize Your Profile</h2>
                <form className='profile-form' onSubmit={handleEditProfile}>
                    <div className='form-group'>
                        <input type="email" name="email" value={user?.email} placeholder="abc@email.com" className='form-input' disabled />
                    </div>

                    <Input
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        value={formValues.firstName}
                        onChange={handleInputChange}
                        error={errors.firstName}
                    />

                    <Input
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        value={formValues.lastName}
                        onChange={handleInputChange}
                        error={errors.lastName}
                    />

                    <Input
                        type="password"
                        name="currentPassword"
                        placeholder="Current Password"
                        value={formValues.currentPassword}
                        onChange={handleInputChange}
                        error={errors.currentPassword}
                        showPassword={showCurrentPassword}
                        toggleShowPassword={toggleShowCurrentPassword}
                    />

                    <Input
                        type="password"
                        name="password"
                        placeholder="New Password"
                        value={formValues.password}
                        onChange={handleInputChange}
                        error={errors.password}
                        showPassword={showPassword}
                        toggleShowPassword={toggleShowPassword}
                    />

                    <Input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formValues.confirmPassword}
                        onChange={handleInputChange}
                        error={errors.confirmPassword}
                        showPassword={showConfirmPassword}
                        toggleShowPassword={toggleShowConfirmPassword}
                    />

                    <div className='buttons flex'>
                        <Button text='UPDATE' variant='fill' disabled={!isFormFilled} />
                        <Button text='CANCEL' variant='empty' onClick={handleCancel} disabled={!isFormFilled} />
                    </div>
                </form>
            </div>
        </div>
    );
}