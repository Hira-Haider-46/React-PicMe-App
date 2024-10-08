import React, { useState } from 'react';
import { CiCirclePlus } from "react-icons/ci";
import pkg from '../../../assets/images/pkg.png';
import Button from '../../../commonComponents/Button';
import './UploadPackage.css';

export default function UploadPackage() {
    const [formData, setFormData] = useState({
        packageName: '',
        packagePrice: '',
        noOfDays: '',
        description: '',
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // Process the form data, e.g., send it to the server
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
            <form className='border package-form flex' onSubmit={handleSubmit}>
                <div className="pkg-input flex">
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
                </div>
                <div className="pkg-input flex">
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
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <Button text='SAVE' variant='fill' />
            </form>
        </div>
    );
}