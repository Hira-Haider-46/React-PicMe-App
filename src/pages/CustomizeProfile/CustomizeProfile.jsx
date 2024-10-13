import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import Button from '../../commonComponents/Button';
import Input from '../../commonComponents/Input';
import profile from '../../assets/images/ProfileImg.png';
import editProfile from '../../assets/images/editProfile.png';
import { EDIT_PROFILE, GLOBAL_CATEGORIES } from '../../apis/apiUrls';
import { patchApiWithAuth, getApiWithAuth } from '../../apis/index';
import { formatCategoryName } from '../../helper/helper';
import './CustomizeProfile.css';

export default function CustomizeProfile() {
    const user = useSelector(state => state.auth.user);
    console.log('user profile', user)
    const profile_image = user?.profile_image_url;

    const [showPasswordFields, setShowPasswordFields] = useState({ password: false, confirmPassword: false, currentPassword: false });

    const initialFormValues = {
        firstName: '', lastName: '', password: '', confirmPassword: '', currentPassword: '',
        profileImage: profile_image ? profile_image : profile
    };

    const [formValues, setFormValues] = useState(initialFormValues);
    const [errors, setErrors] = useState({});
    const [profileImagePreview, setProfileImagePreview] = useState(formValues.profileImage);
    const [isFormModified, setIsFormModified] = useState(false);

    const nameRegex = /^[a-zA-Z0-9_ ]*$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const [selectedGender, setSelectedGender] = useState('');
    const [photographerTypes, setPhotographerTypes] = useState([]);
    const [selectedPhotographerTypes, setSelectedPhotographerTypes] = useState([]);

    const fetchCategories = async () => {
        const res = await getApiWithAuth(`${GLOBAL_CATEGORIES}`);
        if (res.success) {
            const formattedPhotographerTypes = res.data.data.map(category => ({
                label: formatCategoryName(category),
                value: category,
            }));
            setPhotographerTypes(formattedPhotographerTypes);
        } else {
            console.error(res.data.message);
        }
    };

    const handlePhotographerTypeChange = (selectedOptions) => {
        setSelectedPhotographerTypes(selectedOptions);
        if (selectedOptions.length > 0) {
            setErrors(prev => ({ ...prev, photographerTypes: '' }));
        }
    };

    const validateFields = () => {
        const newErrors = {};
        if (!selectedGender) newErrors.gender = 'Please select your gender.';
        if (selectedPhotographerTypes.length === 0) newErrors.photographerTypes = 'Please select at least one photographer type.';
        return newErrors;
    };

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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormValues((prevValues) => ({
                ...prevValues,
                profileImage: file
            }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCancel = () => {
        setFormValues(initialFormValues);
        setErrors({});
        setProfileImagePreview(initialFormValues.profileImage);
        setIsFormModified(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (formValues.currentPassword) {
            formData.append('user[current_pass]', formValues.currentPassword);
        }
        if (formValues.password) {
            formData.append('user[new_password]', formValues.password);
        }
        if (formValues.firstName) {
            formData.append('user[first_name]', formValues.firstName);
        }
        if (formValues.lastName) {
            formData.append('user[last_name]', formValues.lastName);
        }
        if (formValues.profileImage && formValues.profileImage !== profile) {
            formData.append('user[profile_image]', formValues.profileImage);
        }

        for (const pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        const res = await patchApiWithAuth(`${EDIT_PROFILE}${user.id}`, formData);

        if (res.success) {
            console.log('Profile updated successfully');
            handleCancel();
        } else {
            if (res.data.message === 'Please enter your current password') {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    currentPassword: 'Incorrect password',
                }));
            } else {
                console.error(res.data);
            }
        }
    };

    useEffect(() => {
        const isModified = Object.keys(formValues).some(
            key => key !== 'profileImage' ? formValues[key] !== '' : formValues.profileImage !== profile
        );
        setIsFormModified(isModified);
    }, [formValues]);

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="customize-profile border">
            <div className='bio'>
                <div className='bio-img'>
                    <img src={profileImagePreview ? profileImagePreview : initialFormValues.profileImage} alt="profile-img" className='profile-icon' />
                    <label htmlFor="profileImageUpload">
                        <img src={editProfile} alt="profile-edit" className='edit' />
                    </label>
                    <input
                        type="file"
                        id="profileImageUpload"
                        className="file-input"
                        onChange={handleImageChange}
                        accept="image/*"
                        style={{ display: 'none' }}
                    />
                </div>
                <h1>{user?.first_name} {user?.last_name}</h1>
                <p>{user?.email}</p>
            </div>
            <div className='border input-form'>
                <h2 className='h2'>Customize Your Profile</h2>
                <form className='profile-form' onSubmit={handleSubmit}>
                    {user?.type === 1 ? (
                        <>
                            <Input type="text" name="firstName" placeholder="First name" value={formValues.firstName} onChange={handleInputChange} error={errors.firstName} />

                            <Input type="text" name="lastName" placeholder="Last name" value={formValues.lastName} onChange={handleInputChange} error={errors.lastName} />

                            <div>
                                <div className="input-field">
                                    <select
                                        value={selectedGender}
                                        onChange={(e) => {
                                            setSelectedGender(e.target.value);
                                            if (e.target.value) setErrors(prev => ({ ...prev, gender: '' }));
                                            checkIfFormFilled(name, address, e.target.value, selectedPhotographerTypes, uploadedImage);
                                        }}
                                        style={{ color: selectedGender ? 'black' : 'var(--text)' }}
                                    >
                                        <option value="" disabled>Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                {errors.gender && <p className="error-message">{errors.gender}</p>}
                            </div>

                            <Input name="address" placeholder="Address" value={formValues.address} onChange={handleInputChange} error={errors.address} />

                            <div>
                                <Select
                                    isMulti
                                    options={photographerTypes}
                                    value={selectedPhotographerTypes}
                                    onChange={handlePhotographerTypeChange}
                                    placeholder="Add Photographer Types"
                                    styles={{
                                        control: (provided) => ({
                                            ...provided,
                                            color: selectedPhotographerTypes.length > 0 ? 'black' : 'gray',
                                        }),
                                    }}
                                />
                                {errors.photographerTypes && <p className="error-message">{errors.photographerTypes}</p>}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='form-group'>
                                <div className='form-input input-div'>{user?.email}</div>
                            </div>

                            <Input type="text" name="firstName" placeholder="First name" value={formValues.firstName} onChange={handleInputChange} error={errors.firstName} />

                            <Input type="text" name="lastName" placeholder="Last name" value={formValues.lastName} onChange={handleInputChange} error={errors.lastName} />

                            <Input type="password" name="currentPassword" placeholder="Current Password" value={formValues.currentPassword} onChange={handleInputChange} error={errors.currentPassword} showPassword={showPasswordFields.currentPassword} toggleShowPassword={() => handleTogglePassword('currentPassword')} />

                            <Input type="password" name="password" placeholder="New Password" value={formValues.password} onChange={handleInputChange} error={errors.password} showPassword={showPasswordFields.password} toggleShowPassword={() => handleTogglePassword('password')} />

                            <Input type="password" name="confirmPassword" placeholder="Confirm Password" value={formValues.confirmPassword} onChange={handleInputChange} error={errors.confirmPassword} showPassword={showPasswordFields.confirmPassword} toggleShowPassword={() => handleTogglePassword('confirmPassword')} />
                        </>

                    )}
                    <div className='buttons flex'>
                        <Button text='UPDATE' variant='fill' disabled={!isFormModified} />
                        <Button text='CANCEL' variant='empty' onClick={handleCancel} disabled={!isFormModified} />
                    </div>
                </form>
            </div>
        </div >
    );
}