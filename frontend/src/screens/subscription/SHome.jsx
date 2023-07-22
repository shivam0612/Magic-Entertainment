import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAddSubscriptionMutation } from '../../slices/usersApiSlice.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setCredentials } from '../../slices/authSlice.js';

const SHome = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [addSubscription, { loading, error }] = useAddSubscriptionMutation();
  const dispatch = useDispatch();

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const AddSubscription = async (e) => {
    e.preventDefault();

    if (!selectedOption) {
      toast.error('Please select a subscription option.', { autoClose: 3000 });
      return;
    }

    const subscriptionData = {
      userid: userInfo._id,
      startDate: new Date(),
      endDate: null, // Initialize it as null
      active: true,
    };

    if (selectedOption === '7days') {
      subscriptionData.endDate = calculateEndDate("7days");
    } else if (selectedOption === '3months') {
      subscriptionData.endDate = calculateEndDate("3months");
    } else if (selectedOption === 'lifetime') {
      subscriptionData.endDate = calculateEndDate("lifetime");;
    }

    const data = {
      _id: userInfo._id,
      preference: userInfo.preference,
      phone: userInfo.phone,
      email: userInfo.email,
      name: userInfo.name,
      active: subscriptionData.active,
      endDate: subscriptionData.endDate === 'lifetime' ? 'lifetime' : subscriptionData.endDate.toISOString(),
    };
    dispatch(setCredentials(data));

    try {
      const res = await addSubscription(subscriptionData);
      toast.success('You Are Now Subscribed');
      navigate('/submainhome');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const calculateEndDate = (option) => {
    const currentDate = new Date();
  
    if (option === '7days') {
      const endDate = new Date(currentDate);
      endDate.setDate(currentDate.getDate() + 7);
      return endDate;
    } else if (option === '3months') {
      const endDate = new Date(currentDate);
      endDate.setMonth(currentDate.getMonth() + 3);
      return endDate;
    } else if (option === 'lifetime') {
      // Set a long duration for lifetime subscription (e.g., 100 years from now)
      const endDate = new Date(currentDate);
      endDate.setFullYear(currentDate.getFullYear() + 100);
      return endDate;
    }
  
    return currentDate; // Default: Return the current date if no option is selected
  };
    return (
    <div className='body-tag shome'>
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
        <div className='selected-option select-button'>
          <h3>Selected Option: {selectedOption}</h3>
          <button onClick={AddSubscription}>Subscribe</button>
        </div>
      )}
    </div>
  );
};

export default SHome;