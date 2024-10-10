import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiCirclePlus } from "react-icons/ci";
import { CREATE_PACKAGE } from '../../../apis/apiUrls';
import { postApiWithAuth } from '../../../apis/index';
import pkg from '../../../assets/images/pkg.png';
import Button from '../../../commonComponents/Button';
import './UploadPackage.css';

export default function UploadPackage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        packageName: '',
        packagePrice: '',
        noOfDays: '',
        description: '',
    });

    const [errors, setErrors] = useState({
        packageName: '',
        packagePrice: '',
        noOfDays: '',
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        validateField(name, value);
    };

    const validateField = (name, value) => {
        let valid = true;
        const newErrors = { ...errors };

        if (name === "packageName") {
            const namePattern = /^[a-zA-Z0-9\s-]+$/;
            if (!namePattern.test(value)) {
                newErrors.packageName = 'Package name can have letters, numbers, hyphens, and spaces only.';
                valid = false;
            } else {
                newErrors.packageName = '';
            }
        }

        if (name === "packagePrice") {
            const price = parseFloat(value);
            if (isNaN(price) || price <= 0 || price > 9999) {
                newErrors.packagePrice = 'Price must be a number between 1 and 9999.';
                valid = false;
            } else {
                newErrors.packagePrice = '';
            }
        }

        if (name === "noOfDays") {
            const days = parseInt(value, 10);
            if (isNaN(days) || days <= 0 || days > 30) {
                newErrors.noOfDays = 'Number of days must be a valid number between 1 and 30.';
                valid = false;
            } else {
                newErrors.noOfDays = '';
            }
        }

        if (name === "description") {
            const trimmedDescription = value.trim();
            const descriptionPattern = /^([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)*$/;
            if (!descriptionPattern.test(trimmedDescription)) {
                newErrors.description = 'Description must be separated by hyphens.';
                valid = false;
            } else {
                const formattedDescription = trimmedDescription.replace(/^-+|-+$/g, '').replace(/-+/g, '-');
                setFormData((prev) => ({
                    ...prev,
                    description: formattedDescription,
                }));
                newErrors.description = '';
            }
        }

        setErrors(newErrors);
        return valid;
    };

    const validateForm = () => {
        let valid = true;
        Object.keys(formData).forEach((key) => {
            valid = validateField(key, formData[key]) && valid;
        });
        return valid;
    };

    const createPackage = async () => {
        if (!validateForm()) {
            return;
        }

        const days = parseInt(formData.noOfDays, 10);
        const payload = {
            name: formData.packageName,
            description: formData.description,
            price: formData.packagePrice,
            delivery_days: days,
        };

        const res = await postApiWithAuth(CREATE_PACKAGE, payload);
        if (res.success) {
            console.log('Package created successfully');
            navigate('/create-package');
        } else {
            console.error(res.data);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            createPackage();
        }
    };

    return (
        <div className='border' id='upload-pkg'>
            <h2 className='h2'>Upload Package</h2>
            <p className='p'>Upload details of your service packages.</p>
            <div className="file-upload pkg-upload">
                <img src={pkg} alt="pkg-box" />
                <p className='upload-pkg-text flex'>
                    <span><CiCirclePlus /></span>
                    Create new package
                </p>
            </div>
            <h3>Enter Your Package Details</h3>
            <form className='border package-form' onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="packageName"
                        placeholder="Package Name"
                        value={formData.packageName}
                        onChange={handleChange}
                    />
                    {errors.packageName && <p className='error-message'>{errors.packageName}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        name="packagePrice"
                        placeholder="Package Price"
                        value={formData.packagePrice}
                        onChange={handleChange}
                    />
                    {errors.packagePrice && <p className='error-message'>{errors.packagePrice}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        name="noOfDays"
                        placeholder="No. of Days"
                        value={formData.noOfDays}
                        onChange={handleChange}
                    />
                    {errors.noOfDays && <p className='error-message'>{errors.noOfDays}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        name="description"
                        placeholder="Description (separate with -)"
                        value={formData.description}
                        onChange={handleChange}
                    />
                    {errors.description && <p className='error-message'>{errors.description}</p>}
                </div>
                <div className='Btn'>
                    <Button text='SAVE' variant='fill' />
                </div>
            </form>
        </div>
    );
}