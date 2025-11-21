import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await api.get('/admin/reservations');
      setReservations(response.data.data || []);
    } catch (error) {
      toast.error('Failed to load reservations');
      setReservations([]);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/admin/reservations/${id}/status`, { status });
      toast.success('Reservation updated');
      fetchReservations();
    } catch (error) {
      toast.error('Failed to update reservation');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <h1 className="text-4xl font-serif font-bold mb-8">Reservation Management</h1>
        <div className="space-y-4">
          {reservations.map(res => (
            <div key={res._id} className="bg-white p-6 rounded-xl shadow">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">{res.guestName}</h3>
                  <p className="text-gray-600">{res.guestEmail} | {res.guestPhone}</p>
                  <p className="text-gray-600">{new Date(res.date).toLocaleDateString()} at {res.timeSlot}</p>
                  <p className="text-gray-600">{res.numberOfGuests} guests</p>
                </div>
                <select
                  value={res.status}
                  onChange={(e) => updateStatus(res._id, e.target.value)}
                  className="px-3 py-2 border rounded h-fit"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="seated">Seated</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminReservations;
