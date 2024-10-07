import React, { useState } from 'react';
import Button from '../../../../commonComponents/Button';
import visa from '../../../../assets/images/visa.png';
import master from '../../../../assets/images/master.png';
import paypal from '../../../../assets/images/paypal.png';
import './PaymentMethod.css';

export default function PaymentMethod({ onContinue }) {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

    const handlePaymentMethodChange = (event) => {
        setSelectedPaymentMethod(event.target.value);
    };

    const handleContinueClick = () => {
        if (selectedPaymentMethod) {
            onContinue(); 
        }
    };

    return (
        <>
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

            <Button
                text='CONTINUE'
                variant='fill'
                onClick={handleContinueClick}
                disabled={!selectedPaymentMethod}
            />
        </>
    );
}