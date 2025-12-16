import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { FiPackage, FiClock, FiCheckCircle, FiTruck, FiCalendar } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders'); // orders or reservations
  const [filter, setFilter] = useState('all'); // all, pending, completed, cancelled

  useEffect(() => {
    fetchOrdersAndReservations();
  }, []);

  const fetchOrdersAndReservations = async () => {
    try {
      setLoading(true);
      const [ordersRes, reservationsRes] = await Promise.all([
        api.get('/orders'),
        api.get('/reservations')
      ]);
      
      const ordersData = ordersRes.data.data || [];
      const reservationsData = reservationsRes.data.data || [];
      
      // Filter orders to show only current user's orders
      const userOrders = ordersData.filter(order => 
        order.userId === user?.id || 
        order.user_id === user?.id ||
        order.userEmail === user?.email ||
        order.user_email === user?.email
      );
      
      // Filter reservations to show only current user's reservations
      const userReservations = reservationsData.filter(res => 
        res.userId === user?.id || 
        res.user_id === user?.id ||
        res.email === user?.email ||
        res.userEmail === user?.email
      );
      
      setOrders(userOrders);
      setReservations(userReservations);
    } catch (error) {
      console.error('Failed to load data:', error);
      setOrders([]);
      setReservations([]);
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
        return <FiPackage className="text-gray-600 dark:text-gray-400" />;
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold mb-4">My Orders & Reservations</h1>
          <p className="text-gray-600 dark:text-gray-400">{orders.length} orders • {reservations.length} reservations</p>
        </div>

        {/* Main Tabs */}
        <div className="flex gap-4 mb-6 border-b">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 font-semibold transition relative ${activeTab === 'orders' ? 'text-primary-600' : 'text-gray-600 dark:text-gray-400 hover:text-gray-800'}`}
          >
            <FiPackage className="inline mr-2" />
            Orders ({orders.length})
            {activeTab === 'orders' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"></div>}
          </button>
          <button
            onClick={() => setActiveTab('reservations')}
            className={`px-6 py-3 font-semibold transition relative ${activeTab === 'reservations' ? 'text-primary-600' : 'text-gray-600 dark:text-gray-400 hover:text-gray-800'}`}
          >
            <FiCalendar className="inline mr-2" />
            Reservations ({reservations.length})
            {activeTab === 'reservations' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"></div>}
          </button>
        </div>

        {/* Filter Tabs for Orders */}
        {activeTab === 'orders' && <div className="flex gap-2 mb-6 flex-wrap">
          {['all', 'pending', 'completed', 'cancelled'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === f
                  ? 'bg-primary-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading orders...</p>
          </div>
        ) : activeTab === 'orders' ? (
          filteredOrders.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 p-12 rounded-xl shadow text-center">
              <FiPackage className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600 dark:text-gray-400 text-lg">No orders found</p>
              <p className="text-gray-500 mt-2">
                {filter !== 'all' ? `You have no ${filter} orders` : 'Start ordering to see your order history'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
            {filteredOrders.map(order => (
              <div key={order._id} className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        Order #{order.orderNumber || order._id?.slice(-6)}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
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
                        ₹{Math.round(order.total || order.totalPrice || 0)}
                      </p>
                    </div>
                  </div>

                  {/* Order Items */}
                  {order.items && order.items.length > 0 && (
                    <div className="border-t pt-4 mt-4">
                      <h4 className="font-semibold mb-3 text-gray-700 dark:text-gray-300">Order Items</h4>
                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center py-2 border-b last:border-b-0">
                            <div className="flex-1">
                              <p className="font-medium">{item.name || item.itemName || 'Unknown Item'}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Quantity: {item.quantity || 1}</p>
                            </div>
                            <p className="font-semibold text-gray-700 dark:text-gray-300">
                              ₹{Math.round((item.price || item.itemPrice || 0) * (item.quantity || 1))}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Delivery Info */}
                  {order.deliveryAddress && (
                    <div className="border-t pt-4 mt-4">
                      <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Delivery Address</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{order.deliveryAddress}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
            </div>
          )
        ) : (
          reservations.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 p-12 rounded-xl shadow text-center">
              <FiCalendar className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600 dark:text-gray-400 text-lg">No reservations found</p>
              <p className="text-gray-500 mt-2">Book a table to see your reservations here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reservations.map(reservation => (
                <div key={reservation._id} className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg flex items-center gap-2">
                          <FiCalendar className="text-primary-600" />
                          Reservation #{reservation._id?.slice(-6)}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                          Created: {reservation.createdAt ? new Date(reservation.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          }) : 'Date unknown'}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {(reservation.status || 'pending').charAt(0).toUpperCase() + (reservation.status || 'pending').slice(1)}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mt-4 pt-4 border-t">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Date & Time</p>
                        <p className="font-semibold text-gray-800">
                          {reservation.date} at {reservation.time}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Number of Guests</p>
                        <p className="font-semibold text-gray-800">
                          {reservation.guests || reservation.numberOfGuests || 'N/A'} {(reservation.guests || reservation.numberOfGuests) === 1 ? 'guest' : 'guests'}
                        </p>
                      </div>
                      {reservation.specialRequests && (
                        <div className="md:col-span-2">
                          <p className="text-sm text-gray-600 dark:text-gray-400">Special Requests</p>
                          <p className="text-gray-800">{reservation.specialRequests}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default OrdersPage;

