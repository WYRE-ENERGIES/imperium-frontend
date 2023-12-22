// InactivityTimeout.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logOutUser } from 'path/to/authSlice'; // Replace with the actual path

const InactivityTimeout = ({ timeoutInSeconds }) => {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let inactivityTimer;

    const resetTimer = () => {
      if (isActive) {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
          dispatch(logOutUser());
        }, timeoutInSeconds * 1000);
      }
    };

    const handleUserActivity = () => {
      setIsActive(true);
      resetTimer();
    };

    // Set up initial timer
    resetTimer();

    // Add event listeners for user activity
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);

    return () => {
      // Clean up event listeners
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      clearTimeout(inactivityTimer);
    };
  }, [dispatch, isActive, timeoutInSeconds]);

  return <>{/* Render your app components here */}</>;
};

export default InactivityTimeout;
