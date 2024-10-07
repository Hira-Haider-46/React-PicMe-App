import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Button from '../../../../commonComponents/Button';
import 'react-datepicker/dist/react-datepicker.css';
import './BookingCalendar.css'; 

export default function BookingCalendar() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    return (
        <div className="calendar-container">
            <div className="booking-info flex">
                <div className="booking-dates flex">
                    <span>Booking From</span>
                    <p>{startDate ? startDate.toLocaleDateString() : 'Select Start Date'}</p>
                </div>
                <div className='line'></div>
                <div className="booking-dates flex">
                    <span>Booking To</span>
                    <p>{endDate ? endDate.toLocaleDateString() : 'Select End Date'}</p>
                </div>
            </div>
            <DatePicker
                selected={startDate}
                onChange={(dates) => {
                    const [start, end] = dates;
                    setStartDate(start);
                    setEndDate(end);
                }}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
            />
            <Button
                text='CONTINUE'
                variant='fill'
                disabled={!startDate || !endDate}
            />
        </div>
    );
}