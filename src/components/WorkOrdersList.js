import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Tambahkan file CSS untuk gaya

const WorkOrdersList = () => {
  const [workOrders, setWorkOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWorkOrders = async () => {
      const token = localStorage.getItem('token'); // Ambil token dari localStorage

      try {
        const response = await axios.get('/Tickets/list-workorders', {
          headers: {
            Authorization: `Bearer ${token}`, // Tambahkan token ke header permintaan
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
    <div className="work-orders-container">
      <h2>Work Orders List</h2>

      {loading && <p className="loading">Loading work orders...</p>}
      {error && <div className="error-message">{error}</div>}

      {workOrders.length > 0 ? (
        <ul className="work-orders-list">
          {workOrders.map((workOrder) => (
            <li key={workOrder.id} className="work-order-card">
              <p><strong>Status:</strong> {workOrder.status}</p>
              <p><strong>Created At:</strong> {new Date(workOrder.createdAt).toLocaleString()}</p>
              <p><strong>Client Name:</strong> {workOrder.incident.clientName}</p>
              <p><strong>Description:</strong> {workOrder.incident.description}</p>
              <p><strong>Incident Status:</strong> {workOrder.incident.status}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-work-orders">No work orders available.</p>
      )}
    </div>
  );
};

export default WorkOrdersList;
