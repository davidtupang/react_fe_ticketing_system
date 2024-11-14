import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // To handle redirection after successful login

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true); // Set loading state

    try {
      const response = await fetch('http://localhost:3000/api/Auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        setError('Invalid credentials');
        setIsLoading(false); // Reset loading state
        return;
      }

      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        onLogin(data.token); // Pass token up to App component
        navigate('/incidents'); // Redirect to incidents page after successful login
        setUsername(''); // Clear username
        setPassword(''); // Clear password
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred while logging in.');
    }

    setIsLoading(false); // Reset loading state
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
