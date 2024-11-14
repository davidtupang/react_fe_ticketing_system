import React, { useState } from 'react';
import axios from 'axios';

const CreateWorkOrder = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState(''); // Add error state

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that the name and description are provided
    if (!name || !description) {
      setError('Both fields are required!');
      return;
    }

    setLoading(true); // Set loading to true while request is being processed
    setError(''); // Clear previous errors

    try {
      await axios.post('/work-orders', { name, description });
      alert('Work Order created successfully!');
      setName(''); // Clear form fields after success
      setDescription('');
    } catch (err) {
      console.error('Error creating work order:', err);
      setError('There was an error creating the work order. Please try again.');
    } finally {
      setLoading(false); // Set loading to false when the request is done
    }
  };

  return (
    <div>
      <h2>Create Work Order</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>} {/* Display error if any */}
        <input
          type="text"
          placeholder="Work Order Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Work Order Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Work Order'}
        </button>
      </form>
    </div>
  );
};

export default CreateWorkOrder;
