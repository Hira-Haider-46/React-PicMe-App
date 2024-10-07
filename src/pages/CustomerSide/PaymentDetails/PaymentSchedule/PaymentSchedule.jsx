import React from 'react';
import BookingCalendar from '../BookingCalendar';
import './PaymentSchedule.css';

export default function PaymentSchedule() {
  return (
    <div className='schedule'>
          <h1>Choose Date</h1>
          <BookingCalendar />
    </div>
  )
}