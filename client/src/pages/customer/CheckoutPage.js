import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../../context/CartContext';
import api from '../../services/api';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    orderType: 'dine-in',
    contactPhone: '',
    paymentMethod: 'card',
    specialInstructions: '',
    deliveryAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    try {
      const orderData = {
        items: cartItems.map(item => ({
          menuItem: item._id,
          quantity: item.quantity,
          price: item.price
        })),
        orderType: formData.orderType,
        contactPhone: formData.contactPhone,
        paymentMethod: formData.paymentMethod,
        specialInstructions: formData.specialInstructions
      };

      // Add delivery address if order type is delivery
      if (formData.orderType === 'delivery') {
        orderData.deliveryAddress = formData.deliveryAddress;
      }

      const response = await api.post('/orders', orderData);
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/customer/orders');
    } catch (error) {
      console.error('Order error:', error);
      const errorMsg = error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || 'Failed to place order';
      toast.error(errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom max-w-4xl">
        <h1 className="text-4xl font-serif font-bold mb-8">Checkout</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Order Type</label>
                <select
                  value={formData.orderType}
                  onChange={(e) => setFormData({...formData, orderType: e.target.value})}
                  className="input-field"
                >
                  <option value="dine-in">Dine In</option>
                  <option value="takeout">Takeout</option>
                  <option value="delivery">Delivery</option>
                </select>
              </div>

              {formData.orderType === 'delivery' && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold">Delivery Address</h3>
                  <input
                    type="text"
                    placeholder="Street Address"
                    value={formData.deliveryAddress.street}
                    onChange={(e) => setFormData({...formData, deliveryAddress: {...formData.deliveryAddress, street: e.target.value}})}
                    className="input-field"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="City"
                      value={formData.deliveryAddress.city}
                      onChange={(e) => setFormData({...formData, deliveryAddress: {...formData.deliveryAddress, city: e.target.value}})}
                      className="input-field"
                      required
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={formData.deliveryAddress.state}
                      onChange={(e) => setFormData({...formData, deliveryAddress: {...formData.deliveryAddress, state: e.target.value}})}
                      className="input-field"
                      required
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Zip Code"
                    value={formData.deliveryAddress.zipCode}
                    onChange={(e) => setFormData({...formData, deliveryAddress: {...formData.deliveryAddress, zipCode: e.target.value}})}
                    className="input-field"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">Contact Phone</label>
                <input
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Payment Method</label>
                <select
                  value={formData.paymentMethod}
                  onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                  className="input-field"
                >
                  <option value="card">Card</option>
                  <option value="cash">Cash</option>
                  <option value="online">Online</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Special Instructions (Optional)</label>
                <textarea
                  value={formData.specialInstructions}
                  onChange={(e) => setFormData({...formData, specialInstructions: e.target.value})}
                  className="input-field"
                  rows="3"
                  placeholder="Any special requests or dietary requirements..."
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              {cartItems.map(item => (
                <div key={item._id} className="flex justify-between">
                  <span>{item.name} x{item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button type="submit" className="btn-primary w-full">Place Order</button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
