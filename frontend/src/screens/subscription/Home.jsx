import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const navigate = useNavigate()
  const { userInfo } = useSelector((state) => state.auth);

  const AddSubscription = () => {
    navigate('/shome')
  }

  const DelSubscription = () => {
    navigate('/shome')
  }

  return (
    <div className="subscriptions-container">
      <h1 className="subscriptions-title">Subscription Details</h1>

      <div className="subscriptions-card">
        <div className="subscriptions-card-body">
          <h5 className="subscriptions-card-title">Subscription Dates</h5>
          <div className="subscriptions-details">
            <div className="subscriptions-detail">
              <strong>Start Date:</strong>
              <span id="startDate">date</span>
            </div>
            <div className="subscriptions-detail">
              <strong>End Date:</strong>
              <span id="endDate">date</span>
            </div>
            <div className="subscriptions-detail">
              <strong>Active:</strong>
              <span id="active">date</span>
            </div>
          </div>
        </div>
      </div>

      <div className="subscriptions-actions">
        <button className="subscriptions-button subscriptions-button-primary" onClick={AddSubscription}>Add Subscription</button>
        <button className="subscriptions-button subscriptions-button-danger" onClick={DelSubscription}>Delete Subscription</button>
      </div>
    </div>
  );
};

export default Home;
