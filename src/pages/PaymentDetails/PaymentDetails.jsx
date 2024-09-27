import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PkgCard from './PkgCard';
import PaymentMethod from './PaymentMethod';
import PaymentSchedule from './PaymentSchedule';
import './PaymentDetails.css';

export default function PaymentDetails() {
    const location = useLocation();
    const [packageDetails, setPackageDetails] = useState(null);
    const [showSchedule, setShowSchedule] = useState(false); 

    useEffect(() => {
        const storedPackage = localStorage.getItem('selectedPackage');
        if (location.state?.package) {
            setPackageDetails(location.state.package);
        } else if (storedPackage) {
            setPackageDetails(JSON.parse(storedPackage));
        }
    }, [location.state]);

    const handleContinue = () => {
        console.log('showSchedule', showSchedule)
        setShowSchedule(true);
        console.log('showSchedule', showSchedule)
    };

    return (
        <div className='payment-details'>
            <h1>Payment Details</h1>
            <div className="container flex">
                {packageDetails ? (
                    <PkgCard packageDetails={packageDetails} />
                ) : (
                    <p>Loading package details...</p>
                )}

                <div className="payment-method flex">
                    {showSchedule ? (
                        <PaymentSchedule />
                    ) : (
                        <PaymentMethod onContinue={handleContinue} />
                    )}
                </div>
            </div>
        </div>
    );
}