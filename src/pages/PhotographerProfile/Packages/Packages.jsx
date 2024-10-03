import React from 'react';
import PackageCard from './PackageCard';
import basic from '../../../assets/images/basic.png';
import essential from '../../../assets/images/essential.png';
import premium from '../../../assets/images/premium.png';
import './Packages.css';

export default function Packages() {
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
                            video: '1',
                            bgColor: '#2BC7A5'
                        }
                    }
                />
                <PackageCard
                    obj={
                        {
                            logo: essential,
                            name: 'Essential',
                            price: '14',
                            days: '4',
                            photos: '25',
                            video: '4',
                            bgColor: '#2BAFC7'
                        }
                    }
                />
                <PackageCard
                    obj={
                        {
                            logo: premium,
                            name: 'Premium',
                            price: '30',
                            days: '6',
                            photos: '40',
                            video: '6',
                            bgColor: '#2BC7A5'
                        }
                    }
                />
            </div>
        </>
    )
}