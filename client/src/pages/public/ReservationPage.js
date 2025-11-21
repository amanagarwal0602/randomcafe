import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const ReservationPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    guestName: user?.name || '',
    guestEmail: user?.email || '',
    guestPhone: '',
    numberOfGuests: 2,
    date: '',
    timeSlot: '',
    specialRequests: ''
  });

  const timeSlots = [
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '1:00 PM', '1:30 PM', '2:00 PM', '6:00 PM',
    '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/reservations', formData);
      toast.success('Reservation created successfully!');
      navigate('/customer/reservations');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create reservation');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-brown-500 text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-serif font-bold mb-4">Reserve a Table</h1>
          <p className="text-xl">Book your unforgettable dining experience</p>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={formData.guestName}
                  onChange={(e) => setFormData({...formData, guestName: e.target.value})}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={formData.guestEmail}
                  onChange={(e) => setFormData({...formData, guestEmail: e.target.value})}
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.guestPhone}
                  onChange={(e) => setFormData({...formData, guestPhone: e.target.value})}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Number of Guests</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={formData.numberOfGuests}
                  onChange={(e) => setFormData({...formData, numberOfGuests: e.target.value})}
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Time Slot</label>
                <select
                  value={formData.timeSlot}
                  onChange={(e) => setFormData({...formData, timeSlot: e.target.value})}
                  className="input-field"
                  required
                >
                  <option value="">Select time</option>
                  {timeSlots.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Special Requests</label>
              <textarea
                value={formData.specialRequests}
                onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                className="input-field"
                rows="3"
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              Confirm Reservation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
