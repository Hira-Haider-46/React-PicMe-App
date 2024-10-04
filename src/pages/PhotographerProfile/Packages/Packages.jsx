import React from 'react';
import PackageCard from './PackageCard';
import basic from '../../../assets/images/basic.png';
import './Packages.css';

export default function Packages({ packages }) {
    return (
        <>
            <div className="layout-nav flex choose-pkg">
                <a style={{ borderBottom: "2px solid #2BAFC7", color: '#2BAFC7' }}>
                    Choose Package
                </a>
            </div>

            <div className='packages-container flex'>
                <PackageCard
                    obj={
                        {
                            logo: basic,
                            name: 'Basic',
                            price: '10',
                            days: '2',
                            photos: '8',
                            video: '1'
                        }
                    }
                />
            </div>
        </>
    )
}