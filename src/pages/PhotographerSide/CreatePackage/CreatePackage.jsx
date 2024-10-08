import React from 'react';
import Button from '../../../commonComponents/Button';
import PackageCard from './PackageCard';
import './CreatePackage.css';

export default function CreatePackage() {
    return (
        <div className='border create-pkg'>
            <h2 className='h2'>Upload Package</h2>
            <p className='p'>Upload details of your service packages.</p>
            <div className='pkg-container'>
                <PackageCard />
            </div>
            <div className='btn'>
                <Button text='CREATE NEW PACKAGE' variant='empty' />
            </div>
        </div>
    )
}