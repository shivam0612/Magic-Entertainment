import React, { useState } from 'react';

const SHome = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSubscribe = () => {
    // Perform subscription logic based on the selected option
    if (selectedOption === '7days') {
      // Subscribe for 7 days
    } else if (selectedOption === '3months') {
      // Subscribe for 3 months
    } else if (selectedOption === 'lifetime') {
      // Subscribe for a lifetime (no expiry)
    }
  };

  return (
    <div>
      <h1>Subscription Page</h1>

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
          <button>{selectedOption === '7days' ? 'Selected' : 'Select'}</button>
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
          <button>{selectedOption === '3months' ? 'Selected' : 'Select'}</button>
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
          <button>{selectedOption === 'lifetime' ? 'Selected' : 'Select'}</button>
        </div>
      </div>

      {selectedOption && (
        <div>
          <h3>Selected Option: {selectedOption}</h3>
          <button onClick={handleSubscribe}>Subscribe</button>
        </div>
      )}
    </div>
  );
};

export default SHome;
