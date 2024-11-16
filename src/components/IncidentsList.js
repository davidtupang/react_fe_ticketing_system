import React, { useEffect, useState } from 'react';
import axios from 'axios';

const IncidentsList = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  // Fungsi untuk mendapatkan data insiden
  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const token = localStorage.getItem('token');

        if (token) {
          axios.defaults.headers['Authorization'] = `Bearer ${token}`;
        } else {
          setError('Please log in to access incidents.');
          setLoading(false);
          return;
        }

        const response = await axios.get('/Tickets/list-incidents');
        setIncidents(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching incidents:', err);
        setError('Failed to load incidents. Please try again later.');
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  return (
    <div className="incidents-container">
      {/* Header dengan satu tombol Log Out */}
      <div className="header">
        <h2>Incidents List</h2>
      </div>

      {/* Konten utama */}
      {loading && <p className="loading">Loading incidents...</p>}
      {error && <div className="error">{error}</div>}

      <ul className="incidents-list">
        {incidents.length > 0 ? (
          incidents.map((incident) => (
            <li key={incident.id} className="incident-card">
              <strong>{incident.clientName}</strong>
              <span>{incident.description}</span>
              <span>Status: {incident.status}</span>
              <span>
                Created At: {new Date(incident.createdAt).toLocaleString()}
              </span>
            </li>
          ))
        ) : (
          <p className="no-incidents">No incidents available.</p>
        )}
      </ul>
    </div>
  );
};

export default IncidentsList;
