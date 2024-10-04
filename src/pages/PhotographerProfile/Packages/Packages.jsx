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
                {packages && packages.length > 0 ? (
                    packages.map((pkg, index) => (
                        <PackageCard
                            key={index}
                            pkg={{ logo: basic, ...pkg }}
                        />
                    ))
                ) : (
                    <p>No packages available</p> 
                )}
            </div>
        </>
    );
}