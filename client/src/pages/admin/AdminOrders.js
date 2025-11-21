import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  const fetchOrders = async () => {
    try {
      const params = filter !== 'all' ? { status: filter } : {};
      const response = await api.get('/admin/orders', { params });
      setOrders(response.data.data || []);
    } catch (error) {
      toast.error('Failed to load orders');
      setOrders([]);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status });
      toast.success('Order status updated');
      fetchOrders();
    } catch (error) {
      toast.error('Failed to update order');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <h1 className="text-4xl font-serif font-bold mb-8">Order Management</h1>
        
        <div className="mb-6 flex gap-2">
          {['all', 'pending', 'confirmed', 'preparing', 'ready', 'delivered'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg ${
                filter === status ? 'bg-primary-500 text-white' : 'bg-white text-gray-700'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {orders.map(order => (
            <div key={order._id} className="bg-white p-6 rounded-xl shadow">
              <div className="flex justify-between mb-4">
                <div>
                  <h3 className="font-semibold">Order #{order.orderNumber}</h3>
                  <p className="text-gray-600 text-sm">{order.user?.name} - {order.user?.email}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">${order.total.toFixed(2)}</p>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="mt-2 px-3 py-1 border rounded"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="preparing">Preparing</option>
                    <option value="ready">Ready</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
              </div>
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Items:</h4>
                {order.items.map((item, i) => (
                  <p key={i} className="text-gray-600">{item.menuItem?.name} x{item.quantity}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
