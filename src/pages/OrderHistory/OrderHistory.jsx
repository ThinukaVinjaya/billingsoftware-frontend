import { latestOrders } from '../../Service/OrderService';
import './OrderHistory.css';
import React, { useEffect, useState } from 'react';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await latestOrders(); // latestOrders() already returns data
        console.log('Orders fetched:', data);

        // Ensure it's an array
        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Fetch orders error:', error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const formatItems = (items) => {
    const arr = Array.isArray(items) ? items : Array.isArray(items?.orderItems) ? items.orderItems : [];
    if (arr.length === 0) return 'No items';
    return arr.map((item) => `${item.name} x ${item.quantity}`).join(', ');
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  if (loading) return <div className='text-center py-4'>Loading orders...</div>;
  if (orders.length === 0) return <div className='text-center py-4'>No orders found</div>;

  return (
    <div className='orders-history-container'>
      <h2 className='mb-2 text-light'>All Orders</h2>
      <div className='table-responsive'>
        <table className='table table-striped table-hover'>
          <thead className='table-dark'>
            <tr>
              <th>Order Id</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const orderId = order.orderId || order.id;
              const customerName = order.customerName || order.customer?.name || 'N/A';
              const phone = order.phoneNumber || order.customer?.phone || 'N/A';
              const paymentStatus = order.paymentDetails?.status || order.paymentStatus || 'PENDING';
              return (
                <tr key={orderId}>
                  <td>{orderId}</td>
                  <td>
                    {customerName} <br />
                    <small className='text-muted'>{phone}</small>
                  </td>
                  <td>{formatItems(order.items || order.orderItems)}</td>
                  <td>LKR {typeof order.grandTotal === 'number' ? order.grandTotal.toFixed(2) : '0.00'}</td>
                  <td>{order.paymentMethod || 'N/A'}</td>
                  <td>
                    <span className={`badge ${paymentStatus === 'COMPLETED' ? 'bg-success' : 'bg-warning text-dark'}`}>
                      {paymentStatus}
                    </span>
                  </td>
                  <td>{formatDate(order.createdAt || order.date)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* <pre className="text-light">{JSON.stringify(orders, null, 2)}</pre> */}
    </div>
  );
};

export default OrderHistory;
