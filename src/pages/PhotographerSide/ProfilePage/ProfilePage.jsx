import React from 'react';
import { FiUpload } from "react-icons/fi";
import { GoPlusCircle } from "react-icons/go";
import idCardImg from '../../../assets/images/upload-id.png';
import Button from '../../../commonComponents/Button';
import './ProfilePage.css';

export default function ProfilePage() {
  return (
    <div className='profile-page'>
      <h2>Create Your Profile</h2>
      <p>Update your details in the form provided.</p>
      <form>
        <div className="input-field">
          <input type="text" placeholder='Full Name' />
        </div>
        <div className="input-field">
          <select>
            <option value="" disabled selected>Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="input-field">
          <input type="text" placeholder='Address' />
        </div>
        <div className="input-field flex">
          <input type="text" placeholder='Add Custom Photographer Type' />
          <GoPlusCircle />
        </div>
        <div className="input-field">
          <select>
            <option value="" disabled selected>Add Photographer Type</option>
            <option value="">No options available</option>
          </select>
        </div>
        <div className="file-upload">
          <label htmlFor="id-card-upload" className="upload-box">
            <img src={idCardImg} alt="Upload ID Card" />
            <p>
              <span><FiUpload /></span>
              Upload ID Card
            </p>
            <p>
              Upload only in png, jpeg.
            </p>
          </label>
          <input id="id-card-upload" type="file" accept="image/png, image/jpeg" />
        </div>
        <Button text='SUBMIT' variant='fill' />
      </form>
    </div>
  );
}