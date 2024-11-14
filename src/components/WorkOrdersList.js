import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WorkOrdersList = () => {
  const [workOrders, setWorkOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error state

  useEffect(() => {
    const fetchWorkOrders = async () => {
      try {
        const response = await axios.get('/work-orders');
        setWorkOrders(response.data);
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        console.error('Error fetching work orders:', err);
        setError('Failed to load work orders. Please try again later.'); // Set error message
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchWorkOrders();
  }, []);

  return (
    <div>
      <h2>Work Orders List</h2>

      {loading && <p>Loading work orders...</p>} {/* Show loading message */}
      {error && <div className="error">{error}</div>} {/* Show error message if any */}

      <ul>
        {workOrders.length > 0 ? (
          workOrders.map((workOrder) => (
            <li key={workOrder.id}>{workOrder.name}</li>
          ))
        ) : (
          <p>No work orders available.</p> // Show message if no work orders are available
        )}
      </ul>
    </div>
  );
};

export default WorkOrdersList;
