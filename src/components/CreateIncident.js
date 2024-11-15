import React, { useState } from 'react';
import axios from 'axios';

const CreateIncident = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description) {
      setError('Both fields are required!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage

      await axios.post('/Tickets/create-incident',
        { name, description },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to request headers
          },
        }
      );

      alert('Incident created successfully!');
      setName(''); // Clear form fields after success
      setDescription('');
    } catch (err) {
      console.error('Error creating incident:', err);
      setError('There was an error creating the incident. Please try again.');
    } finally {
      setLoading(false); // Set loading to false when the request is done
    }
  };

  return (
    <div>
      <h2>Create Incident</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
        <input
          type="text"
          placeholder="Incident Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Incident Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Incident'}
        </button>
      </form>
    </div>
  );
};

export default CreateIncident;
