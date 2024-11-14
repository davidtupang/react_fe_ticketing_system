import React, { useEffect, useState } from 'react';
import axios from 'axios';

const IncidentsList = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state to track request status
  const [error, setError] = useState(''); // Error state to display error messages

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');
        
        // If the token exists, set it in the Authorization header
        if (token) {
          axios.defaults.headers['Authorization'] = `Bearer ${token}`;
        } else {
          setError('Please log in to access incidents.');
          setLoading(false);
          return;
        }

        // Make the API request with the Authorization header
        const response = await axios.get('/Tickets/list-incidents');
        setIncidents(response.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        console.error('Error fetching incidents:', err);
        setError('Failed to load incidents. Please try again later.'); // Set error message
        setLoading(false); // Set loading to false even if there is an error
      }
    };

    fetchIncidents();
  }, []);

  return (
    <div>
      <h2>Incidents List</h2>

      {loading && <p>Loading incidents...</p>} {/* Display loading message */}
      {error && <div className="error">{error}</div>} {/* Display error message if any */}

      <ul>
        {incidents.length > 0 ? (
          incidents.map((incident) => (
            <li key={incident.id}>
              <strong>{incident.clientName}</strong><br />
              <span>{incident.description}</span><br />
              <span>Status: {incident.status}</span><br />
              <span>Created At: {new Date(incident.createdAt).toLocaleString()}</span>
            </li>
          ))
        ) : (
          <p>No incidents available.</p> // Display message when there are no incidents
        )}
      </ul>
    </div>
  );
};

export default IncidentsList;
