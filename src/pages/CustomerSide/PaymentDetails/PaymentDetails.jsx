import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PkgCard from './PkgCard';
import PaymentMethod from './PaymentMethod';
import PaymentSchedule from './PaymentSchedule';
import { getApiWithAuth } from '../../../apis/index';
import { GET_PACKAGE } from '../../../apis/apiUrls';
import './PaymentDetails.css';

export default function PaymentDetails() {
    const { id } = useParams();
    const [packageDetails, setPackageDetails] = useState(null);
    const [showSchedule, setShowSchedule] = useState(false);

    const fetchPackageDetails = async () => {
        try {
            const res = await getApiWithAuth(`${GET_PACKAGE}${id}`);
            if (res) {
                setPackageDetails(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching package details:", error);
        }
    };

    const handleContinue = () => {
        setShowSchedule(true);
    };

    useEffect(() => {
        fetchPackageDetails();
    }, [id]);

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