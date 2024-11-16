import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import IncidentsList from './components/IncidentsList';
import CreateIncident from './components/CreateIncident';
import WorkOrdersList from './components/WorkOrdersList';
import CreateWorkOrder from './components/CreateWorkOrder';
import Login from './components/Login';
import './App.css';

axios.defaults.baseURL = 'http://localhost:3000/api';
axios.defaults.headers['Content-Type'] = 'application/json';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      axios.defaults.headers['Authorization'] = `Bearer ${token}`;
      setError(null);
    } else {
      setError('Please log in to access the ticketing system.');
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        handleLogout();
        return <Navigate to="/" replace />;
      }
      return Promise.reject(error);
    }
  );

  return (
    <div className="App">
      <h1>Ticketing System</h1>
      {error && <div className="error">{error}</div>}

      {token ? (
        <>
          <button onClick={handleLogout} className="logout-button">
          Log Out
          </button>
          <Routes>
            <Route path="/incidents" element={<IncidentsList />} />
            <Route path="/create-incident" element={<CreateIncident />} />
            <Route path="/work-orders" element={<WorkOrdersList />} />
            <Route path="/create-work-order" element={<CreateWorkOrder />} />
            <Route path="*" element={<Navigate to="/incidents" />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Login onLogin={setToken} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
