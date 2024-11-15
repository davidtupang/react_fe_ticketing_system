import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WorkOrdersList = () => {
  const [workOrders, setWorkOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWorkOrders = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage (or other storage)

      try {
        const response = await axios.get('/Tickets/list-workorders', {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to request headers
          },
        });
        setWorkOrders(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching work orders:', err);
        setError('Failed to load work orders. Please try again later.');
        setLoading(false);
      }
    };

    fetchWorkOrders();
  }, []);

  return (
    <div>
      <h2>Work Orders List</h2>

      {loading && <p>Loading work orders...</p>}
      {error && <div className="error">{error}</div>}

      <ul>
        {workOrders.length > 0 ? (
          workOrders.map((workOrder) => (
            <li key={workOrder.id}>
              <p><strong>Status:</strong> {workOrder.status}</p>
              <p><strong>Created At:</strong> {new Date(workOrder.createdAt).toLocaleString()}</p>
              <p><strong>Client Name:</strong> {workOrder.incident.clientName}</p>
              <p><strong>Description:</strong> {workOrder.incident.description}</p>
              <p><strong>Incident Status:</strong> {workOrder.incident.status}</p>
            </li>
          ))
        ) : (
          <p>No work orders available.</p>
        )}
      </ul>
    </div>
  );
};

export default WorkOrdersList;
