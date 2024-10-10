import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApiWithAuth } from '../../../apis/index';
import { SHOW_PACKAGE } from '../../../apis/apiUrls';
import Button from '../../../commonComponents/Button';
import PackageCard from './PackageCard';
import './CreatePackage.css';

export default function CreatePackage() {

    const [packages, setPackages] = useState(null);
    const navigate = useNavigate();

    const fetchPackages = async () => {
        const res = await getApiWithAuth(SHOW_PACKAGE);
        if (res.success) {
            console.log('packages', res.data.data);
            setPackages(res.data.data);
        } else {
            console.error(res.data);
        }
    }

    const handleCreatPackage = () => {
        navigate('/upload-package');
    }

    useEffect(() => {
        fetchPackages();
    }, []);

    return (
        <div className='border create-pkg'>
            <h2 className='h2'>Upload Package</h2>
            <p className='p'>Upload details of your service packages.</p>
            {(packages && packages.length > 0) ? (
                <div className='pkg-container'>
                    {packages.map((pkg, index) => (
                        <PackageCard
                            key={index}
                            pkg={pkg}
                            refreshPackages={fetchPackages} 
                        />
                    ))}
                </div>
            ) : (
                <p className='select-msg' style={{ marginTop: '2em' }}>No packages available</p>
            )}
            <div className='btn' onClick={handleCreatPackage}>
                <Button text='CREATE NEW PACKAGE' variant='empty' />
            </div>
        </div>
    )
}