import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuLoader2 } from "react-icons/lu";
import { CREATE_PACKAGE, GET_PACKAGE, EDIT_PACKAGE } from '../../../apis/apiUrls';
import { postApiWithAuth, getApiWithAuth, patchApiWithAuth } from '../../../apis/index';
import pkg from '../../../assets/images/pkg.png';
import Button from '../../../commonComponents/Button';
import './UploadPackage.css';

export default function UploadPackage() {
    const navigate = useNavigate();
    const packageId = localStorage.getItem('pkgId');

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

    const [isLoading, setIsLoading] = useState(false);
    const [formFilled, setFormFilled] = useState(false);

    const fetchPackageDetails = async () => {
        if (packageId) {
            try {
                const res = await getApiWithAuth(`${GET_PACKAGE}${packageId}`);
                if (res.success) {
                    const packageData = res.data.data;
                    console.log('packageData', packageData)
                    setFormData({
                        packageName: packageData.name || '',
                        packagePrice: packageData.price || '',
                        noOfDays: packageData.delivery_days || '',
                        description: packageData.description ? packageData.description.replace(/-/g, ' - ') : '',
                    });
                    setFormFilled(true); 
                } else {
                    console.error(res.data);
                }
            } catch (error) {
                console.error("Error fetching package details:", error);
            }
        }
    };

    useEffect(() => {
        if (packageId) {
            fetchPackageDetails();
        }
    }, [packageId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        validateField(name, value);
        checkButtonDisabled();
    };

    const validateField = (name, value) => {
        const newErrors = { ...errors };
        if (name === "packageName") {
            const namePattern = /^[a-zA-Z0-9\s-]+$/;
            if (!namePattern.test(value)) {
                newErrors.packageName = 'Package name can have letters, numbers, and hyphens only.';
            } else {
                newErrors.packageName = '';
            }
        }

        if (name === "packagePrice") {
            const price = parseFloat(value);
            if (isNaN(price) || price <= 0 || price > 9999) {
                newErrors.packagePrice = 'Price must be a number between 1 and 9999.';
            } else {
                newErrors.packagePrice = '';
            }
        }

        if (name === "noOfDays") {
            const days = parseInt(value, 10);
            if (isNaN(days) || days <= 0 || days > 30) {
                newErrors.noOfDays = 'Number of days must be a valid number between 1 and 30.';
            } else {
                newErrors.noOfDays = '';
            }
        }

        if (name === "description") {
            const descriptionPattern = /^[a-zA-Z0-9\s-]+$/;
            if (!descriptionPattern.test(value)) {
                newErrors.description = 'Description must be separated with hyphens (-).';
            } else {
                const formattedDescription = value
                    .replace(/^-+|-+$/g, '')
                    .replace(/[\s-]+/g, '-');
                setFormData((prev) => ({
                    ...prev,
                    description: formattedDescription,
                }));
                newErrors.description = '';
            }
        }

        setErrors(newErrors);
    };

    const checkButtonDisabled = () => {
        const atLeastOneFilled = Object.values(formData).every((field) => String(field).trim() !== '');
        setFormFilled(atLeastOneFilled);
    };

    const savePackage = async () => {
        setIsLoading(true);

        const days = parseInt(formData.noOfDays, 10);
        const payload = {
            name: formData.packageName,
            description: formData.description,
            price: formData.packagePrice,
            delivery_days: days,
        };

        const res = packageId
            ? await patchApiWithAuth(`${EDIT_PACKAGE}/${packageId}`, payload)
            : await postApiWithAuth(CREATE_PACKAGE, payload);

        if (res.success) {
            console.log(packageId ? 'Package updated successfully' : 'Package created successfully');
            setIsLoading(false);
            localStorage.removeItem('pkgId');
            navigate('/create-package');
        } else {
            console.error(res.data);
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = { ...errors };
        let hasError = false;

        if (!String(formData.packageName).trim()) {
            newErrors.packageName = 'Package name is required.';
            hasError = true;
        }
        if (!String(formData.packagePrice).trim()) {
            newErrors.packagePrice = 'Package price is required.';
            hasError = true;
        }
        if (!String(formData.noOfDays).trim()) {
            newErrors.noOfDays = 'Number of days is required.';
            hasError = true;
        }
        if (!String(formData.description).trim()) {
            newErrors.description = 'Description is required.';
            hasError = true;
        }

        setErrors(newErrors);

        if (!hasError && Object.values(errors).every((error) => error === '')) {
            savePackage();
        }
    };

    useEffect(() => {
        checkButtonDisabled();
    }, [formData]);

    return (
        <div className='border' id='upload-pkg'>
            <h2 className='h2'>{packageId ? 'Edit Package' : 'Upload Package'}</h2>
            <p className='p'>Upload details of your service packages.</p>
            <div className="file-upload pkg-upload">
                <img src={pkg} alt="pkg-box" />
                <p className='upload-pkg-text flex'>
                    Create or edit package details.
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
                <div className='button'>
                    <Button text={isLoading ? <LuLoader2 className="loader" /> : 'SAVE'} disabled={!formFilled || isLoading} variant='fill'
                    />
                </div>
            </form>
        </div>
    );
}