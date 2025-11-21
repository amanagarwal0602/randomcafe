import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data.data || []);
    } catch (error) {
      console.error('Failed to load orders');
      setOrders([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <h1 className="text-4xl font-serif font-bold mb-8">My Orders</h1>
        {orders.length === 0 ? (
          <div className="bg-white p-12 rounded-xl shadow text-center">
            <p className="text-gray-600">No orders yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order._id} className="bg-white p-6 rounded-xl shadow">
                <div className="flex justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">Order #{order.orderNumber}</h3>
                    <p className="text-gray-600 text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                    <p className="mt-2 font-bold">${order.total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
