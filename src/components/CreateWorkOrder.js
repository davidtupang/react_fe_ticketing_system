import React, { useState } from 'react';
import axios from 'axios';

const CreateWorkOrder = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [incidentId, setIncidentId] = useState(0); // Add incidentId state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that the name and description are provided
    if (!name || !description) {
      setError('Both fields are required!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage

      await axios.post(
        'http://localhost:3000/api/Tickets/create-workorder',
        { name, description, incidentId }, // Include incidentId in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to request headers
          },
        }
      );

      alert('Work Order created successfully!');
      setName('');
      setDescription('');
      setIncidentId(0); // Reset incidentId after successful creation
    } catch (err) {
      console.error('Error creating work order:', err);
      setError('There was an error creating the work order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create Work Order</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
        <input
          type="number"
          placeholder="Incident ID"
          value={incidentId}
          onChange={(e) => setIncidentId(Number(e.target.value))}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Work Order'}
        </button>
      </form>
    </div>
  );
};

export default CreateWorkOrder;
