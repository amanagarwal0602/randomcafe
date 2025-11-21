import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { FiPackage, FiClock, FiCheckCircle, FiTruck } from 'react-icons/fi';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, completed, cancelled

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get('/orders');
      console.log('Orders response:', response.data);
      const ordersData = response.data.data || [];
      setOrders(ordersData);
    } catch (error) {
      console.error('Failed to load orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
      case 'completed':
        return <FiCheckCircle className="text-green-600" />;
      case 'processing':
      case 'preparing':
        return <FiClock className="text-yellow-600" />;
      case 'out_for_delivery':
      case 'shipping':
        return <FiTruck className="text-blue-600" />;
      default:
        return <FiPackage className="text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
      case 'preparing':
        return 'bg-yellow-100 text-yellow-800';
      case 'out_for_delivery':
      case 'shipping':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    if (filter === 'pending') return ['pending', 'processing', 'preparing', 'out_for_delivery'].includes(order.status?.toLowerCase());
    if (filter === 'completed') return ['delivered', 'completed'].includes(order.status?.toLowerCase());
    if (filter === 'cancelled') return order.status?.toLowerCase() === 'cancelled';
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold mb-4">My Orders</h1>
          <p className="text-gray-600">{orders.length} total orders</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {['all', 'pending', 'completed', 'cancelled'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === f
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Loading orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white p-12 rounded-xl shadow text-center">
            <FiPackage className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600 text-lg">No orders found</p>
            <p className="text-gray-500 mt-2">
              {filter !== 'all' ? `You have no ${filter} orders` : 'Start ordering to see your order history'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map(order => (
              <div key={order._id} className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        Order #{order.orderNumber || order._id?.slice(-6)}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : 'Date unknown'}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                        {(order.status || 'pending').replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                      <p className="mt-2 text-2xl font-bold text-primary-600">
                        ${(order.total || order.totalPrice || 0).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Order Items */}
                  {order.items && order.items.length > 0 && (
                    <div className="border-t pt-4 mt-4">
                      <h4 className="font-semibold mb-3 text-gray-700">Order Items</h4>
                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center py-2 border-b last:border-b-0">
                            <div className="flex-1">
                              <p className="font-medium">{item.name || item.itemName || 'Unknown Item'}</p>
                              <p className="text-sm text-gray-600">Quantity: {item.quantity || 1}</p>
                            </div>
                            <p className="font-semibold text-gray-700">
                              ${((item.price || item.itemPrice || 0) * (item.quantity || 1)).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Delivery Info */}
                  {order.deliveryAddress && (
                    <div className="border-t pt-4 mt-4">
                      <h4 className="font-semibold mb-2 text-gray-700">Delivery Address</h4>
                      <p className="text-gray-600 text-sm">{order.deliveryAddress}</p>
                    </div>
                  )}
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
