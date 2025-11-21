import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [dateFilter, setDateFilter] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });
  const [activeTab, setActiveTab] = useState('overview'); // overview, dateWise, products, customers

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [ordersRes, menuRes] = await Promise.all([
        api.get('/orders'),
        api.get('/menu')
      ]);
      console.log('Dashboard data:', { ordersRes, menuRes });
      setOrders(ordersRes.data.data || []);
      setMenuItems(menuRes.data.data?.items || menuRes.data.data || []);
    } catch (error) {
      console.error('Dashboard error:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Calculate today's sales
  const getTodaySales = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayOrders = orders.filter(order => {
      const orderDate = new Date(order.created_at).toISOString().split('T')[0];
      return orderDate === today && order.status !== 'cancelled';
    });
    
    return {
      count: todayOrders.length,
      total: todayOrders.reduce((sum, order) => sum + (parseFloat(order.total) || 0), 0)
    };
  };

  // Calculate monthly sales
  const getMonthlySales = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    const monthOrders = orders.filter(order => {
      const orderDate = new Date(order.created_at);
      return orderDate.getMonth() === currentMonth && 
             orderDate.getFullYear() === currentYear &&
             order.status !== 'cancelled';
    });
    
    return {
      count: monthOrders.length,
      total: monthOrders.reduce((sum, order) => sum + (parseFloat(order.total) || 0), 0)
    };
  };

  // Calculate date-wise sales
  const getDateWiseSales = () => {
    const start = new Date(dateFilter.startDate);
    const end = new Date(dateFilter.endDate);
    end.setHours(23, 59, 59, 999);
    
    const filteredOrders = orders.filter(order => {
      const orderDate = new Date(order.created_at);
      return orderDate >= start && orderDate <= end && order.status !== 'cancelled';
    });
    
    // Group by date
    const salesByDate = {};
    filteredOrders.forEach(order => {
      const date = new Date(order.created_at).toISOString().split('T')[0];
      if (!salesByDate[date]) {
        salesByDate[date] = { count: 0, total: 0 };
      }
      salesByDate[date].count++;
      salesByDate[date].total += parseFloat(order.total) || 0;
    });
    
    return Object.entries(salesByDate)
      .map(([date, data]) => ({ date, ...data }))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  // Calculate product-wise sales from menu items
  const getProductWiseSales = () => {
    const productSales = {};
    
    // Count from menu item order_count if available
    menuItems.forEach(item => {
      if (item.order_count > 0) {
        productSales[item.id] = {
          name: item.name,
          quantity: item.order_count || 0,
          revenue: (item.order_count || 0) * (parseFloat(item.price) || 0),
          price: parseFloat(item.price) || 0
        };
      }
    });
    
    return Object.values(productSales)
      .sort((a, b) => b.revenue - a.revenue);
  };

  // Calculate customer-wise sales
  const getCustomerWiseSales = () => {
    const customerSales = {};
    
    orders.forEach(order => {
      if (order.status === 'cancelled') return;
      
      const key = order.customerEmail || order.customer_email || 'Guest';
      if (!customerSales[key]) {
        customerSales[key] = {
          name: order.customerName || order.customer_name || 'Guest',
          email: key,
          orderCount: 0,
          totalSpent: 0
        };
      }
      customerSales[key].orderCount++;
      customerSales[key].totalSpent += parseFloat(order.total) || 0;
    });
    
    return Object.values(customerSales)
      .sort((a, b) => b.totalSpent - a.totalSpent);
  };

  // Get overall stats
  const getOverallStats = () => {
    const completedOrders = orders.filter(o => o.status !== 'cancelled');
    const totalRevenue = completedOrders.reduce((sum, order) => sum + (parseFloat(order.total) || 0), 0);
    const avgOrderValue = completedOrders.length > 0 ? totalRevenue / completedOrders.length : 0;
    
    return {
      totalOrders: completedOrders.length,
      totalRevenue,
      avgOrderValue,
      totalProducts: menuItems.length,
      activeProducts: menuItems.filter(m => m.isAvailable !== false).length
    };
  };

  const todaySales = getTodaySales();
  const monthlySales = getMonthlySales();
  const dateWiseSales = getDateWiseSales();
  const productWiseSales = getProductWiseSales();
  const customerWiseSales = getCustomerWiseSales();
  const overallStats = getOverallStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-xl text-gray-600">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Sales Dashboard</h1>
        <p className="text-gray-600 mt-2">Complete overview of your restaurant sales and analytics</p>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today's Sales</p>
              <p className="text-2xl font-bold text-gray-800">${todaySales.total.toFixed(2)}</p>
              <p className="text-xs text-gray-500 mt-1">{todaySales.count} orders</p>
            </div>
            <div className="bg-blue-100 rounded-full p-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Monthly Sales</p>
              <p className="text-2xl font-bold text-gray-800">${monthlySales.total.toFixed(2)}</p>
              <p className="text-xs text-gray-500 mt-1">{monthlySales.count} orders</p>
            </div>
            <div className="bg-green-100 rounded-full p-3">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-800">${overallStats.totalRevenue.toFixed(2)}</p>
              <p className="text-xs text-gray-500 mt-1">{overallStats.totalOrders} orders</p>
            </div>
            <div className="bg-purple-100 rounded-full p-3">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Order Value</p>
              <p className="text-2xl font-bold text-gray-800">${overallStats.avgOrderValue.toFixed(2)}</p>
              <p className="text-xs text-gray-500 mt-1">Per order</p>
            </div>
            <div className="bg-orange-100 rounded-full p-3">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Quick Links
            </button>
            <button
              onClick={() => setActiveTab('dateWise')}
              className={`px-6 py-3 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'dateWise'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Date-wise Sales
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-6 py-3 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'products'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Product-wise Sales
            </button>
            <button
              onClick={() => setActiveTab('customers')}
              className={`px-6 py-3 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'customers'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Customer-wise Sales
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Quick Links Tab */}
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">📊 Management</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {[
                  { title: 'Orders', path: '/admin/orders', color: 'bg-blue-500', desc: 'Manage customer orders' },
                  { title: 'Reservations', path: '/admin/reservations', color: 'bg-purple-500', desc: 'Table bookings' },
                  { title: 'Menu', path: '/admin/menu', color: 'bg-green-500', desc: 'Food & drinks' },
                  { title: 'Gallery', path: '/admin/gallery', color: 'bg-yellow-500', desc: 'Photo management' },
                  { title: 'Users', path: '/admin/users', color: 'bg-orange-500', desc: 'User accounts' },
                  { title: 'Reviews', path: '/admin/reviews', color: 'bg-pink-500', desc: 'Customer feedback' },
                  { title: 'Coupons', path: '/admin/coupons', color: 'bg-emerald-500', desc: 'Discount codes' },
                  { title: 'Roles & Permissions', path: '/admin/roles', color: 'bg-indigo-600', desc: 'Access control' },
                ].map((link, i) => (
                  <Link key={i} to={link.path} className={`${link.color} text-white p-5 rounded-lg shadow hover:opacity-90 transition`}>
                    <h3 className="text-lg font-bold mb-1">{link.title}</h3>
                    <p className="text-sm opacity-90">{link.desc}</p>
                  </Link>
                ))}
              </div>

              <h2 className="text-xl font-bold text-gray-800 mb-4">🎨 Website Content (CMS)</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: 'Hero Section', path: '/admin/hero', color: 'bg-indigo-500', desc: 'Homepage banner' },
                  { title: 'About Section', path: '/admin/about', color: 'bg-cyan-500', desc: 'Story & mission' },
                  { title: 'Features', path: '/admin/features', color: 'bg-teal-500', desc: 'Service highlights' },
                  { title: 'Team Members', path: '/admin/team', color: 'bg-rose-500', desc: 'Staff profiles' },
                  { title: 'Contact Info', path: '/admin/contact-info', color: 'bg-amber-500', desc: 'Address & hours' },
                  { title: 'Site Settings', path: '/admin/site-settings', color: 'bg-slate-500', desc: 'Branding & colors' },
                  { title: 'SEO Settings', path: '/admin/seo', color: 'bg-violet-500', desc: 'Meta tags & keywords' },
                ].map((link, i) => (
                  <Link key={i} to={link.path} className={`${link.color} text-white p-5 rounded-lg shadow hover:opacity-90 transition`}>
                    <h3 className="text-lg font-bold mb-1">{link.title}</h3>
                    <p className="text-sm opacity-90">{link.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Date-wise Sales Tab */}
          {activeTab === 'dateWise' && (
            <div>
              <div className="flex flex-wrap gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={dateFilter.startDate}
                    onChange={(e) => setDateFilter(prev => ({ ...prev, startDate: e.target.value }))}
                    className="px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    value={dateFilter.endDate}
                    onChange={(e) => setDateFilter(prev => ({ ...prev, endDate: e.target.value }))}
                    className="px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Sales</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg Order</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dateWiseSales.map((day) => (
                      <tr key={day.date}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{day.count}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                          ${day.total.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${(day.total / day.count).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {dateWiseSales.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No sales data for selected date range
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Product-wise Sales Tab */}
          {activeTab === 'products' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity Sold</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {productWiseSales.map((product, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${product.price.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                        ${product.revenue.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {productWiseSales.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No product sales data available
                </div>
              )}
            </div>
          )}

          {/* Customer-wise Sales Tab */}
          {activeTab === 'customers' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Spent</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg Order</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customerWiseSales.map((customer, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{customer.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{customer.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.orderCount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                        ${customer.totalSpent.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${(customer.totalSpent / customer.orderCount).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {customerWiseSales.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No customer sales data available
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
