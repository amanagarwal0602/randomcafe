import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Alert from '../../components/common/Alert';

const MyReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

  const handleCancelReservation = async (reservationId) => {
    if (!window.confirm('Are you sure you want to cancel this reservation?')) {
      return;
    }

    try {
      await api.put(`/reservations/${reservationId}/status`, { status: 'cancelled' });
      setSuccess('Reservation cancelled successfully');
      fetchReservations();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Failed to cancel reservation. Please try again.');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 dark:bg-gray-900 py-12">
      <div className="container-custom">
        <h1 className="text-4xl font-serif font-bold mb-8 dark:text-gray-100">My Reservations</h1>
        
        {/* Error/Success Messages */}
        {error && (
          <Alert 
            type="error" 
            message={error} 
            onClose={() => setError('')}
            className="mb-6"
          />
        )}
        {success && (
          <Alert 
            type="success" 
            message={success}
            onClose={() => setSuccess('')}
            className="mb-6"
          />
        )}
        
        {reservations.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 p-12 rounded-xl shadow text-center">
            <p className="text-gray-600 dark:text-gray-400">No reservations yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reservations.map(res => (
              <div key={res._id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg dark:text-gray-100">Reservation #{res.reservationNumber || res._id.slice(-6)}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      <span className="font-medium">Date:</span> {new Date(res.date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Time:</span> {res.timeSlot || res.time_slot}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Guests:</span> {res.numberOfGuests || res.number_of_guests}
                    </p>
                    {res.specialRequests && (
                      <p className="text-gray-600 dark:text-gray-400 mt-2">
                        <span className="font-medium">Special Requests:</span> {res.specialRequests}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                      res.status === 'confirmed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                      res.status === 'cancelled' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {res.status?.charAt(0).toUpperCase() + res.status?.slice(1)}
                    </span>
                    
                    {/* Cancel button - only show for confirmed or pending reservations */}
                    {(res.status === 'confirmed' || res.status === 'pending') && (
                      <button
                        onClick={() => handleCancelReservation(res._id)}
                        className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 transition font-medium text-sm"
                      >
                        Cancel Reservation
                      </button>
                    )}
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

export default MyReservationsPage;

