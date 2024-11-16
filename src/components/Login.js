import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import CryptoJS from 'crypto-js';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  //const encryptPassword = (password) => {
  //   const secretKey = 'YzMyNjk4ZjYyMjA2ZTE2YjUzZDMyYjk1NjM4NjkxYzY='; // Securely store this in environment variables for production
  //   const iv = CryptoJS.enc.Utf8.parse('0000000000000000'); // Static IV (should be securely generated and stored ideally)
  //   return CryptoJS.AES.encrypt(password, CryptoJS.enc.Base64.parse(secretKey), { iv: iv }).toString();
  // };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      //const encryptedPassword = encryptPassword(password); // Encrypt the password
      const response = await fetch('http://localhost:3000/api/Auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }), // Send the encrypted password
      });
  
      if (!response.ok) {
        setError('Invalid credentials');
        setIsLoading(false);
        return;
      }
  
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        onLogin(data.token);
        navigate('/incidents');
        setUsername('');
        setPassword('');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred while logging in.');
    }
    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <span className="input-icon">👤</span>
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="input-icon">🔒</span>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
