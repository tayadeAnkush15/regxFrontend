import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Modal = ({ isOpen, onClose, onSubmit, user }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: { name: '' }, 
    website: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
  });

  
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        company: { name: user.company.name || '' }, 
        website: user.website || '',
      });
    } else {
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: { name: '' }, 
        website: '',
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    
    if (name === 'company') {
      setFormData((prev) => ({
        ...prev,
        company: { name: value }, 
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    const { name, email, phone, company, website } = formData;
    let newErrors = {};

    if (!name) newErrors.name = 'Name is required.';
    if (!email) newErrors.email = 'Email is required.';
    else if (!validateEmail(email)) newErrors.email = 'Invalid email format.';
    if (!phone) newErrors.phone = 'Phone number is required.';
    else if (!validatePhone(phone)) newErrors.phone = 'Phone number must be 10 digits.';
    if (!company.name) newErrors.company = 'Company name is required.'; 
    if (!website) newErrors.website = 'Website is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
      toast.success(user ? 'Successfully edited user.' : 'Successfully added user.');
      onClose();
    } else {
      toast.error('Please correct the errors and try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">{user ? 'Edit User' : 'Add New User'}</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md outline-none"
            placeholder="Enter name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md outline-none"
            placeholder="Enter email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md outline-none"
            placeholder="Enter phone number (10 digits)"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Company</label>
          <input
            type="text"
            name="company"
            value={formData.company.name} 
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md outline-none"
            placeholder="Enter company name"
          />
          {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Website</label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md outline-none"
            placeholder="Enter website URL"
          />
          {errors.website && <p className="text-red-500 text-sm">{errors.website}</p>}
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            {user ? 'Update User' : 'Add User'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
