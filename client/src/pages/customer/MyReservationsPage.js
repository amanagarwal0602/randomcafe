import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const MyReservationsPage = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await api.get('/reservations');
      setReservations(response.data.data || []);
    } catch (error) {
      console.error('Failed to load reservations');
      setReservations([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <h1 className="text-4xl font-serif font-bold mb-8">My Reservations</h1>
        {reservations.length === 0 ? (
          <div className="bg-white p-12 rounded-xl shadow text-center">
            <p className="text-gray-600">No reservations yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reservations.map(res => (
              <div key={res._id} className="bg-white p-6 rounded-xl shadow">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">Reservation #{res.reservationNumber}</h3>
                    <p className="text-gray-600">{new Date(res.date).toLocaleDateString()} at {res.timeSlot}</p>
                    <p className="text-gray-600">{res.numberOfGuests} guests</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm h-fit ${
                    res.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {res.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReservationsPage;
