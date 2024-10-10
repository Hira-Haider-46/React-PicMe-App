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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const isValidDescription = (description) => {
        const descriptionPattern = /^([a-zA-Z0-9]+-)*[a-zA-Z0-9]+$/;
        return descriptionPattern.test(description);
    };

    const createPackage = async () => {
        if (!isValidDescription(formData.description)) {
            console.error('Description must be separated by hyphens');
            return;
        }

        const days = parseInt(formData.noOfDays, 10);
        if (isNaN(days)) {
            console.error('No. of Days must be a valid number');
            return;
        }

        const payload = {
            name: formData.packageName,
            description: formData.description,
            price: formData.packagePrice,
            delivery_days: days
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
        createPackage();
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
                <input
                    type="text"
                    name="packageName"
                    placeholder="Package Name"
                    value={formData.packageName}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="packagePrice"
                    placeholder="Package Price"
                    value={formData.packagePrice}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="noOfDays"
                    placeholder="No. of Days"
                    value={formData.noOfDays}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description (separate with -)"
                    value={formData.description}
                    onChange={handleChange}
                />
                <div className='Btn'>
                    <Button text='SAVE' variant='fill' />
                </div>
            </form>
        </div>
    );
}