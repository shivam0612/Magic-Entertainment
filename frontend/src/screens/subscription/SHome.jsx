import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAddSubscriptionMutation } from '../../slices/usersApiSlice.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setCredentials } from '../../slices/authSlice.js';

const SHome = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate()
  const { userInfo } = useSelector((state) => state.auth);
  const [addSubscription, { loading, error }] = useAddSubscriptionMutation();
  const dispatch = useDispatch();
// console.log(userInfo)
console.log(userInfo)
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const AddSubscription = async (e) => {
    e.preventDefault();

    if (selectedOption === '7days') {
      // Subscribe for 7 days
    } else if (selectedOption === '3months') {
      // Subscribe for 3 months
    } else if (selectedOption === 'lifetime') {
      // Subscribe for a lifetime (no expiry)
    }

    if (userInfo && selectedOption) {
      const subscriptionData = {
        userid: userInfo._id,
        startDate: new Date(),
        endDate: null,
        active: true,
      };
    
      if (userInfo.endDate && new Date(userInfo.endDate) > new Date()) {
        const existingEndDate = new Date(userInfo.endDate);
    
        if (selectedOption === '7days') {
          existingEndDate.setDate(existingEndDate.getDate() + 7);
        } else if (selectedOption === '3months') {
          existingEndDate.setMonth(existingEndDate.getMonth() + 3);
        }
    
        subscriptionData.endDate = existingEndDate;
      } else {
        subscriptionData.endDate = calculateEndDate(selectedOption);
      }
      
      const data = {
        _id: userInfo._id,
        preference: userInfo.preference,
        phone: userInfo.phone,
        email: userInfo.email,
        name: userInfo.name,
        active: subscriptionData.active,
        endDate: subscriptionData.endDate.toISOString(),
      };
      dispatch(setCredentials(data));

      try {
        const res = await addSubscription(subscriptionData);
        toast.success('You Are Now Suscribed');
        navigate('/submainhome')
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const calculateEndDate = (option) => {
    // Calculate and return the end date based on the selected option
    // You can implement your own logic here based on your subscription durations

    // Example:
    const currentDate = new Date();
    if (option === '7days') {
      currentDate.setDate(currentDate.getDate() + 7);
    } else if (option === '3months') {
      currentDate.setMonth(currentDate.getMonth() + 3);
    } else if (option === 'lifetime') {
      currentDate.setFullYear(currentDate.getFullYear() + 100); // Set a long duration for lifetime subscription
    }
    return currentDate;
  };


  return (
    <div className='body-tag vh-100'>
      <h1 className='Sub-title pt-5'>Subscription Page</h1>

      <div className="subscription-container">
        <div
          className={`subscription-card ${selectedOption === '7days' ? 'selected' : ''}`}
          onClick={() => handleOptionSelect('7days')}
        >
          <h3>7 Days Subscription</h3>
          <p>Price: $9.99</p>
          <div className="inner-card">
            <h4>Features:</h4>
            <ul>
              <li>Access to Magic Entertainment Videos</li>
              <li>Unlimited Uploads</li>
            </ul>
          </div>
          <div className='select-button'>
            <button >{selectedOption === '7days' ? 'Selected' : 'Select'}</button>
          </div>
        </div>

        <div
          className={`subscription-card ${selectedOption === '3months' ? 'selected' : ''}`}
          onClick={() => handleOptionSelect('3months')}
        >
          <h3>3 Months Subscription</h3>
          <p>Price: $29.99</p>
          <div className="inner-card">
            <h4>Features:</h4>
            <ul>
              <li>Access to Magic Entertainment Videos</li>
              <li>Unlimited Uploads</li>
              <li>Exclusive features and updates</li>
              <li>Priority customer support</li>
            </ul>
          </div>
          <div className='select-button'>
            <button >{selectedOption === '3months' ? 'Selected' : 'Select'}</button>
          </div>
        </div>

        <div
          className={`subscription-card ${selectedOption === 'lifetime' ? 'selected' : ''}`}
          onClick={() => handleOptionSelect('lifetime')}
        >
          <h3>Lifetime Subscription</h3>
          <p>Price: $99.99</p>
          <div className="inner-card">
            <h4>Features:</h4>
            <ul>
              <li>Access to Magic Entertainment Videos</li>
              <li>Unlimited Uploads</li>
              <li>Exclusive features and updates</li>
              <li>Priority customer support</li>
              <li>No expiry</li>
            </ul>
          </div>
          <div className='select-button'>
            <button >{selectedOption === 'lifetime' ? 'Selected' : 'Select'}</button>
          </div>
        </div>
      </div>

      {selectedOption && (
        <div>
          <h3>Selected Option: {selectedOption}</h3>
          <button onClick={AddSubscription}>Subscribe</button>
        </div>
      )}
    </div>
  );
};

export default SHome;