import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Log out the user by clearing the token and other logout logic
    onLogout();

    // Redirect to the login page after a brief delay
    const timer = setTimeout(() => {
      navigate('/');
    }, 1000); // You can adjust the delay time as needed

    // Clean up timer on component unmount
    return () => clearTimeout(timer);
  }, [onLogout, navigate]);

  return (
    <div>
      <h2>You have been logged out.</h2>
      <p>Redirecting to login page...</p>
    </div>
  );
};

export default Logout;
