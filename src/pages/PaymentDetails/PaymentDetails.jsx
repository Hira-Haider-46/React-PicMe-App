import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PkgCard from './PkgCard';
import PaymentMethod from './PaymentMethod';
import './PaymentDetails.css';

export default function PaymentDetails() {
    const location = useLocation();
    const [packageDetails, setPackageDetails] = useState(null);

    useEffect(() => {
        const storedPackage = localStorage.getItem('selectedPackage');
        if (location.state?.package) {
            setPackageDetails(location.state.package);
        } else if (storedPackage) {
            setPackageDetails(JSON.parse(storedPackage));
        }
    }, [location.state]);

    return (
        <div className='payment-details'>
            <h1>Payment Details</h1>
            <div className="container flex">
                {packageDetails ? (
                    <PkgCard packageDetails={packageDetails} />
                ) : (
                    <p>Loading package details...</p>
                )}
                <PaymentMethod />
            </div>
        </div>
    );
}