import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { FiUpload } from "react-icons/fi";
import { LuLoader2 } from "react-icons/lu";
import { GoPlusCircle } from "react-icons/go";
import { AiOutlineClose } from "react-icons/ai";
import idCardImg from '../../../assets/images/upload-id.png';
import Button from '../../../commonComponents/Button';
import { getApiWithAuth, postApiWithAuth } from '../../../apis/index';
import { GLOBAL_CATEGORIES, ADD_CATEGORY, CREATE_PROFILE } from '../../../apis/apiUrls';
import { formatCategoryName } from '../../../helper/helper';
import './ProfilePage.css';

export default function ProfilePage() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [photographerTypes, setPhotographerTypes] = useState([]);
  const [selectedPhotographerTypes, setSelectedPhotographerTypes] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [customPhotographerType, setCustomPhotographerType] = useState('');
  const [loading, setLoading] = useState({ submit: false, customType: false });
  const [errors, setErrors] = useState({});
  const [formFilled, setFormFilled] = useState(false);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    const res = await getApiWithAuth(`${GLOBAL_CATEGORIES}`);
    if (res.success) {
      const formattedPhotographerTypes = res.data.data.map(category => ({
        label: formatCategoryName(category),
        value: category,
      }));
      setPhotographerTypes(formattedPhotographerTypes);
    } else {
      console.error(res.data.message);
    }
  };

  const addType = async (type) => {
    setLoading(prev => ({ ...prev, customType: true }));
    const res = await postApiWithAuth(ADD_CATEGORY, { category: [type] });
    if (res.success) {
      console.log('Type added successfully');
      fetchCategories();
    } else {
      console.error(res.data);
    }
    setLoading(prev => ({ ...prev, customType: false }));
  };

  const handlePhotographerTypeChange = (selectedOptions) => {
    setSelectedPhotographerTypes(selectedOptions);
    if (selectedOptions.length > 0) {
      setErrors(prev => ({ ...prev, photographerTypes: '' }));
    }
    checkIfFormFilled(name, address, selectedGender, selectedOptions, uploadedImage);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(file);
      setErrors(prev => ({ ...prev, image: '' }));
    }
  };

  const handleImageRemove = () => {
    setUploadedImage(null);
  };

  const handleCustomTypeAdd = () => {
    const exists = photographerTypes.some(type => type.value === customPhotographerType);
    if (!exists && customPhotographerType) {
      addType(customPhotographerType);
      setSelectedPhotographerTypes(prev => [
        ...prev,
        { label: formatCategoryName(customPhotographerType), value: customPhotographerType }
      ]);
      setErrors(prev => ({ ...prev, photographerTypes: '' }));
      setCustomPhotographerType('');
    } else {
      alert('Photographer type already exists or is empty!');
    }
  };

  const validateFields = () => {
    const newErrors = {};
    if (!name || !/^[a-zA-Z0-9_ ]+$/.test(name)) {
      newErrors.name = 'Username may consist of letters, numbers and underscores.';
    }
    if (!selectedGender) newErrors.gender = 'Please select your gender.';
    if (!address) newErrors.address = 'Please enter your address.';
    if (selectedPhotographerTypes.length === 0) newErrors.photographerTypes = 'Please select at least one photographer type.';
    if (!uploadedImage) newErrors.image = 'Please upload an ID card image.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateFields();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setLoading(prev => ({ ...prev, submit: true }));
    const formData = new FormData();
    formData.append('name', name);
    formData.append('address', address);
    formData.append('gender', selectedGender);
    selectedPhotographerTypes.forEach(option => {
      formData.append('category[]', option.value); 
    });

    if (uploadedImage) {
      formData.append('document_pictures[]', uploadedImage); 
    }

    try {
      const res = await postApiWithAuth(CREATE_PROFILE, formData);
      if (res.success) {
        console.log('Profile created successfully');
        navigate('/home-page');
      } else {
        console.error(res.data);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    setLoading(prev => ({ ...prev, submit: false }));
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);

    const validationErrors = validateFields();
    setErrors(prev => ({ ...prev, name: validationErrors.name || '' }));
    checkIfFormFilled(value, address, selectedGender, selectedPhotographerTypes, uploadedImage);
  };

  const handleAddressChange = (e) => {
    const value = e.target.value;
    setAddress(value);
    if (value) setErrors(prev => ({ ...prev, address: '' }));
    checkIfFormFilled(name, value, selectedGender, selectedPhotographerTypes, uploadedImage);
  };

  const checkIfFormFilled = (name, address, gender, photographerTypes, image) => {
    if (name || address || gender || photographerTypes.length > 0 || image) {
      setFormFilled(true);
    } else {
      setFormFilled(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className='profile-page'>
      <h2 className='h2'>Create Your Profile</h2>
      <p className='p'>Update your details in the form provided.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="input-field">
            <input
              type="text"
              placeholder='Full Name'
              value={name}
              onChange={handleNameChange}
            />
          </div>
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div>
          <div className="input-field">
            <select
              value={selectedGender}
              onChange={(e) => {
                setSelectedGender(e.target.value);
                if (e.target.value) setErrors(prev => ({ ...prev, gender: '' }));
                checkIfFormFilled(name, address, e.target.value, selectedPhotographerTypes, uploadedImage);
              }}
              style={{ color: selectedGender ? 'black' : 'var(--text)' }}
            >
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          {errors.gender && <p className="error-message">{errors.gender}</p>}
        </div>
        <div>
          <div className="input-field">
            <input
              type="text"
              placeholder='Address'
              value={address}
              onChange={handleAddressChange}
            />
          </div>
          {errors.address && <p className="error-message">{errors.address}</p>}
        </div>

        <div className="input-field flex">
          <input
            type="text"
            placeholder='Add Custom Photographer Type'
            value={customPhotographerType}
            onChange={(e) => setCustomPhotographerType(e.target.value)}
          />
          {loading.customType ? <LuLoader2 className="loader" /> :
            <GoPlusCircle
              onClick={handleCustomTypeAdd}
              style={{ cursor: 'pointer' }}
            />
          }
        </div>
        <div>
          <Select
            isMulti
            options={photographerTypes}
            value={selectedPhotographerTypes}
            onChange={handlePhotographerTypeChange}
            placeholder="Add Photographer Types"
            styles={{
              control: (provided) => ({
                ...provided,
                color: selectedPhotographerTypes.length > 0 ? 'black' : 'gray',
              }),
            }}
          />
          {errors.photographerTypes && <p className="error-message">{errors.photographerTypes}</p>}
        </div>
        <div className="file-upload">
          {uploadedImage ? (
            <div className="uploaded-image">
              <img src={URL.createObjectURL(uploadedImage)} alt="Uploaded" />
              <AiOutlineClose onClick={handleImageRemove} className="remove-icon" />
            </div>
          ) : (
              <label htmlFor="id-card-upload" className="upload-box flex">
                <img src={idCardImg} alt="Upload ID Card" />
                <p className='upload-text'>
                  <span><FiUpload /></span>
                  Upload ID Card Image
                </p>
                <p className='upload-text2'>
                  Upload only in png, jpeg.
                </p>
                <input
                  id="id-card-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
          )}
        </div>
        {errors.image && <p className="error-message">{errors.image}</p>}
        <div className="button">
          <Button text={loading.submit ? <LuLoader2 className="loader" /> : 'Submit'} disabled={!formFilled || loading.submit} variant='fill' />
        </div>
      </form>
    </div>
  );
}