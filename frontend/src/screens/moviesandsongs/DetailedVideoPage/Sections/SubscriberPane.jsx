import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import axios from 'axios';

function SubscriberPane(props) {
  const user = useSelector((state) => state.user);
  const userTo = props.userTo;
  const userFrom = props.userFrom;

  const subscribeNumberVariables = {
    userTo: userTo,
    userFrom: userFrom,
  };

  const [subscribeNumber, setSubscribeNumber] = useState(0);
  const [subscribed, setSubscribed] = useState(false);

  const onSubscribe = () => {
    let subscribeVariables = {
      userTo: userTo,
      userFrom: userFrom,
    };

    if (user.userData && !user.userData.isAuth) {
      return alert('Sign in first!');
    }

    if (!subscribed) {
      axios.post('/api/subscribe/subscribe', subscribeVariables)
        .then((response) => {
          if (response.data.success) {
            setSubscribeNumber(subscribeNumber + 1);
            setSubscribed(true);
          } else {
            alert('Failed to subscribe');
          }
        });
    } else {
      axios.post('/api/subscribe/unsubscribe', subscribeVariables)
        .then((response) => {
          if (response.data.success) {
            setSubscribeNumber(subscribeNumber - 1);
            setSubscribed(false);
          } else {
            alert('Failed to unsubscribe');
          }
        });
    }
  };

  useEffect(() => {
    axios.post('/api/subscribe/subscribeNumber', subscribeNumberVariables)
      .then((response) => {
        if (response.data.success) {
          setSubscribeNumber(response.data.subscribeNumber);
        } else {
          alert('Failed to get subscriber information');
        }
      });

    axios.post('/api/subscribe/subscribed', subscribeNumberVariables)
      .then((response) => {
        if (response.data.success) {
          setSubscribed(response.data.subscribed);
        } else {
          alert('Failed to get subscribed information');
        }
      });
  }, []);

  return (
    <div>
      <Button
        onClick={onSubscribe}
        style={{
          backgroundColor: `${user.userData && !user.userData.isAuth ? 'rgb(37, 141, 252)' : (subscribed ? '#AAAAAA' : 'rgb(37, 141, 252)')}`,
          borderRadius: '4px',
          color: 'white',
        }}
      >
        {subscribeNumber} {user.userData && !user.userData.isAuth ? 'Subscribe' : (subscribed ? 'Subscribed' : 'Subscribe')}
      </Button>
    </div>
  );
}

export default SubscriberPane;
