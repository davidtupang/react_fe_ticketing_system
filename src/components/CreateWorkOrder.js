import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WorkOrdersList = () => {
  const [workOrders, setWorkOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fungsi untuk mendapatkan data work orders
  useEffect(() => {
    const fetchWorkOrders = async () => {
      try {
        const token = localStorage.getItem('token');

        if (token) {
          axios.defaults.headers['Authorization'] = `Bearer ${token}`;
        } else {
          setError('Please log in to access work orders.');
          setLoading(false);
          return;
        }

        const response = await axios.get('/Tickets/list-workorders');
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
      {/* Header dengan satu tombol Log Out */}
      <div className="header">
        <h2>Work Orders List</h2>
      </div>

      {/* Konten utama */}
      {loading && <p className="loading">Loading work orders...</p>}
      {error && <div className="error">{error}</div>}

      <ul className="work-orders-list">
        {workOrders.length > 0 ? (
          workOrders.map((workOrder) => (
            <li key={workOrder.id} className="work-order-card">
              <strong>{workOrder.incident.clientName}</strong>
              <span>{workOrder.incident.description}</span>
              <span>Status: {workOrder.status}</span>
              <span>
                Created At: {new Date(workOrder.createdAt).toLocaleString()}
              </span>
            </li>
          ))
        ) : (
          <p className="no-work-orders">No work orders available.</p>
        )}
      </ul>
    </div>
  );
};

export default WorkOrdersList;
