import React, { useState, useEffect, useRef } from 'react';
import api from '../../services/api';
import Alert from '../../components/common/Alert';
import { FiPrinter, FiEye, FiX, FiCalendar, FiDollarSign, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const AdminOrders = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    // Export orders as CSV
    const handleExportCSV = () => {
      if (!orders || orders.length === 0) return;
      const replacer = (key, value) => value === null ? '' : value;
      const header = Object.keys(orders[0]);
      const csv = [
        header.join(','),
        ...orders.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
      ].join('\r\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `orders_${new Date().toISOString().slice(0,10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    };
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showBill, setShowBill] = useState(false);
  const [dateFilter, setDateFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'dateWise'
  const [expandedDates, setExpandedDates] = useState({});
  const billRef = useRef();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get('/orders');
      const ordersData = response.data.data || response.data || [];
      
      // Add daily bill numbers to orders
      const ordersWithBillNumbers = addDailyBillNumbers(ordersData);
      setOrders(ordersWithBillNumbers);
    } catch (error) {
      console.error('Failed to load orders:', error);
      setError('Failed to load orders');
      setTimeout(() => setError(''), 5000);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // Generate daily bill numbers (resets each day)
  const addDailyBillNumbers = (ordersData) => {
    const ordersByDate = {};
    
    // Sort orders by date
    const sortedOrders = [...ordersData].sort((a, b) => 
      new Date(a.createdAt) - new Date(b.createdAt)
    );
    
    // Group by date and assign bill numbers
    return sortedOrders.map(order => {
      const orderDate = new Date(order.createdAt).toDateString();
      
      if (!ordersByDate[orderDate]) {
        ordersByDate[orderDate] = 0;
      }
      
      ordersByDate[orderDate]++;
      
      return {
        ...order,
        dailyBillNumber: ordersByDate[orderDate],
        billDate: orderDate
      };
    });
  };

  const updateStatus = async (orderId, status) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status });
      setSuccess('Order status updated');
      setTimeout(() => setSuccess(''), 3000);
      fetchOrders();
    } catch (error) {
      setError('Failed to update order');
      setTimeout(() => setError(''), 3000);
    }
  };

  const viewBill = (order) => {
    setSelectedOrder(order);
    setShowBill(true);
  };

  const printBill = (order) => {
    if (!order) return;
    const printContent = billRef.current;
    const windowPrint = window.open('', '', 'width=800,height=600');
    windowPrint.document.write('<html><head><title>Bill #' + order.dailyBillNumber + '</title>');
    windowPrint.document.write('<style>');
    windowPrint.document.write(`
      body { font-family: Arial, sans-serif; padding: 20px; }
      .bill-header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #000; padding-bottom: 15px; }
      .bill-header h1 { margin: 0; font-size: 28px; }
      .bill-info { margin: 20px 0; }
      .bill-info p { margin: 5px 0; }
      table { width: 100%; border-collapse: collapse; margin: 20px 0; }
      th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
      th { background-color: #f5f5f5; font-weight: bold; }
      .total-row { font-weight: bold; font-size: 18px; border-top: 2px solid #000; }
      .bill-footer { margin-top: 40px; text-align: center; border-top: 1px dashed #000; padding-top: 20px; }
      @media print { button { display: none; } }
    `);
    windowPrint.document.write('</style></head><body>');
    windowPrint.document.write(printContent.innerHTML);
    windowPrint.document.write('</body></html>');
    windowPrint.document.close();
    windowPrint.focus();
    setTimeout(() => {
      windowPrint.print();
      windowPrint.close();
    }, 250);
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      preparing: 'bg-purple-100 text-purple-800',
      ready: 'bg-green-100 text-green-800',
      delivered: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status?.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  // Filter orders by search term, status filter, and date filter
  const filteredOrders = orders.filter(order => {
    // Apply status filter
    if (filter !== 'all' && order.status?.toLowerCase() !== filter.toLowerCase()) {
      return false;
    }
    
    // Apply date filter
    if (dateFilter) {
      const orderDate = new Date(order.createdAt).toISOString().split('T')[0];
      if (orderDate !== dateFilter) {
        return false;
      }
    }
    
    // Apply search filter
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      order.dailyBillNumber?.toString().includes(search) ||
      order.orderNumber?.toLowerCase().includes(search) ||
      order.customerName?.toLowerCase().includes(search) ||
      order.customerEmail?.toLowerCase().includes(search) ||
      order.userName?.toLowerCase().includes(search) ||
      order.userEmail?.toLowerCase().includes(search)
    );
  });

  // Group orders by date
  const ordersByDate = filteredOrders.reduce((acc, order) => {
    const date = order.createdAt ? new Date(order.createdAt).toDateString() : 'Unknown Date';
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(order);
    return acc;
  }, {});

  // Sort dates descending (newest first)
  const sortedDates = Object.keys(ordersByDate).sort((a, b) => new Date(b) - new Date(a));

  const toggleDateExpansion = (date) => {
    setExpandedDates(prev => ({
      ...prev,
      [date]: !prev[date]
    }));
  };

  // Calculate daily total
  const dailyTotal = dateFilter 
    ? filteredOrders.reduce((sum, order) => sum + (order.total || order.totalPrice || 0), 0)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container-custom">
        {error && <Alert type="error" message={error} />}
        {success && <Alert type="success" message={success} />}
        
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-2">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 rounded-lg font-medium transition bg-green-600 text-white hover:bg-green-700"
              aria-label="Export Orders as CSV"
            >
              Export CSV
            </button>
          </div>
          <div>
            <h1 className="text-4xl font-serif font-bold">Order Management</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{filteredOrders.length} orders</p>
          </div>
          {dateFilter && (
            <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-lg shadow">
              <p className="text-sm text-gray-600 dark:text-gray-400">Daily Total</p>
              <p className="text-3xl font-bold text-primary-600">₹{dailyTotal.toFixed(2)}</p>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-6 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2 flex-wrap">
              <span className="font-semibold text-gray-700 dark:text-gray-300 flex items-center">Status:</span>
              {['all', 'pending', 'confirmed', 'preparing', 'ready', 'delivered'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    filter === status
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  viewMode === 'list'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setViewMode('dateWise')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  viewMode === 'dateWise'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                Date-wise View
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <FiCalendar /> Filter by Date
              </label>
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Search Orders</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by bill #, customer name, email..."
                className="input-field"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 p-12 rounded-xl shadow text-center">
            <p className="text-gray-600 dark:text-gray-400 text-lg">No orders found</p>
          </div>
        ) : viewMode === 'dateWise' ? (
          <div className="space-y-4">
            {sortedDates.map(date => {
              const dateOrders = ordersByDate[date];
              const isExpanded = expandedDates[date];
              const dateTotal = dateOrders.reduce((sum, order) => sum + (order.total || order.totalPrice || 0), 0);
              
              return (
                <div key={date} className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
                  <div 
                    className="p-6 bg-gradient-to-r from-primary-50 to-primary-100 cursor-pointer hover:from-primary-100 hover:to-primary-200 transition"
                    onClick={() => toggleDateExpansion(date)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <FiCalendar size={24} className="text-primary-600" />
                        <div>
                          <h3 className="font-bold text-xl text-gray-800">
                            {new Date(date).toLocaleDateString('en-IN', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{dateOrders.length} orders</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-600 dark:text-gray-400">Daily Total</p>
                          <p className="text-2xl font-bold text-primary-600">₹{dateTotal.toFixed(2)}</p>
                        </div>
                        {isExpanded ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
                      </div>
                    </div>
                  </div>
                  
                  {isExpanded && (
                    <div className="p-6 space-y-4 border-t">
                      {dateOrders.map(order => (
                        <div key={order._id} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg hover:shadow-md transition">
                          <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                            <div className="flex-1 min-w-[200px]">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-bold text-lg">Bill #{order.dailyBillNumber}</h3>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                                  {(order.status || 'pending').toUpperCase()}
                                </span>
                              </div>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Customer: {order.customerName || order.userName || 'Guest'}
                              </p>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">
                                {order.customerEmail || order.userEmail || 'N/A'}
                              </p>
                              <p className="text-gray-500 text-xs mt-1">
                                {order.createdAt ? new Date(order.createdAt).toLocaleTimeString('en-US', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                }) : 'Time unknown'}
                              </p>
                            </div>

                            <div className="text-right">
                              <p className="text-2xl font-bold text-primary-600 mb-3">
                                ₹{(order.total || order.totalPrice || 0).toFixed(2)}
                              </p>
                              <select
                                value={order.status || 'pending'}
                                onChange={(e) => updateStatus(order.id, e.target.value)}
                                className="px-3 py-2 border rounded-lg text-sm font-medium mb-2 w-full"
                              >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="preparing">Preparing</option>
                                <option value="ready">Ready</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                              <button
                                onClick={() => viewBill(order)}
                                className="w-full px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm flex items-center justify-center gap-1"
                              >
                                <FiEye /> View Bill
                              </button>
                            </div>
                          </div>

                          {/* Order Items Preview */}
                          <div className="border-t pt-3 mt-3">
                            <div className="space-y-1">
                              {order.items && order.items.length > 0 ? (
                                order.items.map((item, i) => (
                                  <div key={i} className="flex justify-between text-sm">
                                    <span className="text-gray-700 dark:text-gray-300">
                                      {item.name || item.itemName || item.menuItem?.name || 'Unknown Item'} 
                                      <span className="text-gray-500"> x{item.quantity || 1}</span>
                                    </span>
                                    <span className="font-medium">
                                      ₹{((item.price || item.itemPrice || 0) * (item.quantity || 1)).toFixed(2)}
                                    </span>
                                  </div>
                                ))
                              ) : (
                                <p className="text-gray-500 text-sm">No items</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map(order => (
              <div key={order._id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                  <div className="flex-1 min-w-[200px]">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-xl">Bill #{order.dailyBillNumber}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {(order.status || 'pending').toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Order ID: {order.orderNumber || order._id?.slice(-8)}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Customer: {order.customerName || order.userName || 'Guest'}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {order.customerEmail || order.userEmail || 'N/A'}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      {order.createdAt ? new Date(order.createdAt).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : 'Date unknown'}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-3xl font-bold text-primary-600 mb-3">
                      ₹{(order.total || order.totalPrice || 0).toFixed(2)}
                    </p>
                    <select
                      value={order.status || 'pending'}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className="px-3 py-2 border rounded-lg text-sm font-medium mb-2 w-full"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="preparing">Preparing</option>
                      <option value="ready">Ready</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <button
                      onClick={() => viewBill(order)}
                      className="w-full px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm flex items-center justify-center gap-1"
                    >
                      <FiEye /> View Bill
                    </button>
                  </div>
                </div>

                {/* Order Items Preview */}
                <div className="border-t pt-4 mt-4">
                  <h4 className="font-semibold mb-3 text-gray-700 dark:text-gray-300">Order Items:</h4>
                  <div className="space-y-2">
                    {order.items && order.items.length > 0 ? (
                      order.items.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-gray-700 dark:text-gray-300">
                            {item.name || item.itemName || item.menuItem?.name || 'Unknown Item'} 
                            <span className="text-gray-500"> x{item.quantity || 1}</span>
                          </span>
                          <span className="font-medium">
                            ₹{((item.price || item.itemPrice || 0) * (item.quantity || 1)).toFixed(2)}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No items</p>
                    )}
                  </div>
                  
                  {/* Show reservation details if order includes reservation */}
                  {(order.hasReservation || order.reservationDate) && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                        <FiCalendar className="text-purple-600" />
                        Table Reservation Included
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {order.reservationDate && (
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Date:</span>
                            <span className="ml-2 font-medium">{new Date(order.reservationDate).toLocaleDateString()}</span>
                          </div>
                        )}
                        {order.reservationTime && (
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Time:</span>
                            <span className="ml-2 font-medium">{order.reservationTime}</span>
                          </div>
                        )}
                        {order.numberOfGuests && (
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Guests:</span>
                            <span className="ml-2 font-medium">{order.numberOfGuests}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bill Modal */}
        {showBill && selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white dark:bg-gray-800 z-10">
                <h2 className="text-2xl font-bold">Bill #{selectedOrder.dailyBillNumber}</h2>
                <div className="flex gap-2">
                  <button
                    onClick={printBill}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2"
                  >
                    <FiPrinter /> Print Bill
                  </button>
                  <button
                    onClick={() => { setShowBill(false); setSelectedOrder(null); }}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-300"
                  >
                    <FiX size={24} />
                  </button>
                </div>
              </div>

              <div ref={billRef} className="p-8">
                <div className="bill-header">
                  <h1>Lumiere Cafe</h1>
                  <p>Restaurant & Cafe</p>
                  <p>123 Main Street, City, State 12345</p>
                  <p>Phone: (123) 456-7890</p>
                </div>

                <div className="bill-info">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p><strong>Bill Number:</strong> #{selectedOrder.dailyBillNumber}</p>
                      <p><strong>Order ID:</strong> {selectedOrder.orderNumber || selectedOrder._id?.slice(-8)}</p>
                      <p><strong>Date:</strong> {selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleString() : 'N/A'}</p>
                    </div>
                    <div>
                      <p><strong>Customer:</strong> {selectedOrder.customerName || selectedOrder.userName || 'Guest'}</p>
                      <p><strong>Email:</strong> {selectedOrder.customerEmail || selectedOrder.userEmail || 'N/A'}</p>
                      <p><strong>Status:</strong> <span className={`px-2 py-1 rounded text-xs ${getStatusColor(selectedOrder.status)}`}>
                        {(selectedOrder.status || 'pending').toUpperCase()}
                      </span></p>
                    </div>
                  </div>
                </div>

                <table>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items && selectedOrder.items.length > 0 ? (
                      selectedOrder.items.map((item, i) => (
                        <tr key={i}>
                          <td>{item.name || item.itemName || item.menuItem?.name || 'Unknown Item'}</td>
                          <td>{item.quantity || 1}</td>
                          <td>₹{(item.price || item.itemPrice || 0).toFixed(2)}</td>
                          <td>₹{((item.price || item.itemPrice || 0) * (item.quantity || 1)).toFixed(2)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center text-gray-500">No items</td>
                      </tr>
                    )}
                    <tr className="total-row">
                      <td colSpan="3" style={{ textAlign: 'right' }}>TOTAL:</td>
                      <td>₹{(selectedOrder.total || selectedOrder.totalPrice || 0).toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>

                {selectedOrder.deliveryAddress && (
                  <div className="bill-info">
                    <p><strong>Delivery Address:</strong></p>
                    <p>{selectedOrder.deliveryAddress}</p>
                  </div>
                )}

                <div className="bill-footer">
                  <p><strong>Thank you for your order!</strong></p>
                  <p>Visit us again at Lumiere Cafe</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;

