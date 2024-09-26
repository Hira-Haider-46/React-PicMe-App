import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Button from '../../commonComponents/Button';
import visa from '../../assets/images/visa.png';
import master from '../../assets/images/master.png';
import paypal from '../../assets/images/paypal.png';
import './PaymentDetails.css';

export default function PaymentDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const [packageDetails, setPackageDetails] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

    useEffect(() => {
        const storedPackage = localStorage.getItem('selectedPackage');
        if (location.state?.package) {
            setPackageDetails(location.state.package);
        } else if (storedPackage) {
            setPackageDetails(JSON.parse(storedPackage));
        }
    }, [location.state, navigate]);

    if (!packageDetails) {
        return <div>Loading...</div>;
    }

    const handlePaymentMethodChange = (event) => {
        setSelectedPaymentMethod(event.target.value);
    };

    return (
        <div className='payment-details'>
            <h1>Payment Details</h1>
            <div className="container flex">
                <div className='pkg-card package-card' style={{ backgroundColor: packageDetails.bgColor }}>
                    <img src={packageDetails.logo} alt={packageDetails.name} />
                    <h2>{packageDetails.name}</h2>
                    <h3>${packageDetails.price}</h3>
                    <ul>
                        <li>{packageDetails.days} days Package</li>
                        <li>Up to {packageDetails.photos} Photos</li>
                        <li>Up to {packageDetails.video} Video</li>
                    </ul>
                    <Button text='SELECTED' styles={{ backgroundColor: 'white', color: packageDetails.bgColor, border: '1.5px solid white', fontWeight: 'bolder', fontSize: '0.9rem', cursor: 'auto' }} />
                </div>

                <div className="payment-method flex">
                    <h1>Select the Payment method you want to use</h1>

                    <div className="payment-options flex">
                        <label className="payment-option flex">
                            <span className='flex span-img'>
                                <img src={visa} alt="visa" />
                                Visa
                            </span>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="Visa"
                                checked={selectedPaymentMethod === 'Visa'}
                                onChange={handlePaymentMethodChange}
                            />
                        </label>
                        <label className="payment-option flex">
                            <span className='flex span-img'>
                                <img src={master} alt="master" />
                                MasterCard
                            </span>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="MasterCard"
                                checked={selectedPaymentMethod === 'MasterCard'}
                                onChange={handlePaymentMethodChange}
                            />
                        </label>
                        <label className="payment-option flex">
                            <span className='flex span-img'>
                                <img src={paypal} alt="paypal" />
                                PayPal                                
                            </span>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="PayPal"
                                checked={selectedPaymentMethod === 'PayPal'}
                                onChange={handlePaymentMethodChange}
                            />
                        </label>
                    </div>

                    <Link to=''>
                        <Button
                            text='CONTINUE'
                            styles={{ backgroundColor: '#2BAFC7', color: 'white', border: 'none' }}
                            disabled={!selectedPaymentMethod}
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
}