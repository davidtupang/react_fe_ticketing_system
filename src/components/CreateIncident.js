import React, { useState } from 'react';
import axios from 'axios';

const CreateIncident = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState(''); // Add error state

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description) {
      setError('Both fields are required!');
      return;
    }

    setLoading(true); // Set loading to true while request is being processed
    setError(''); // Clear previous errors

    try {
      await axios.post('/incidents', { name, description });
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
