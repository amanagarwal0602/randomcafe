import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Alert from '../../components/common/Alert';
import { FiTrash2, FiMessageSquare, FiX } from 'react-icons/fi';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [responseText, setResponseText] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await api.get('/admin/reviews');
      setReviews(response.data.data || []);
    } catch (error) {
      setError('Failed to load reviews');
      setTimeout(() => setError(''), 5000);
      setReviews([]);
    }
  };

  const togglePublish = async (reviewId) => {
    try {
      await api.put(`/admin/reviews/${reviewId}/toggle-publish`);
      setSuccess('Review status updated');
      setTimeout(() => setSuccess(''), 5000);
      fetchReviews();
    } catch (error) {
      setError('Failed to update review');
      setTimeout(() => setError(''), 5000);
    }
  };

  const deleteReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await api.delete(`/reviews/${reviewId}`);
        setSuccess('Review deleted successfully');
        setTimeout(() => setSuccess(''), 5000);
        fetchReviews();
      } catch (error) {
        setError('Failed to delete review');
        setTimeout(() => setError(''), 5000);
      }
    }
  };

  const handleResponse = async () => {
    if (!responseText.trim()) {
      setError('Please enter a response');
      setTimeout(() => setError(''), 5000);
      return;
    }
    try {
      await api.put(`/reviews/${selectedReview._id}/respond`, { response: responseText });
      setSuccess('Response added successfully');
      setTimeout(() => setSuccess(''), 5000);
      setShowResponseModal(false);
      setResponseText('');
      setSelectedReview(null);
      fetchReviews();
    } catch (error) {
      setError('Failed to add response');
      setTimeout(() => setError(''), 5000);
    }
  };

  const filteredReviews = reviews.filter(review => {
    if (filter === 'published') return review.isPublished;
    if (filter === 'unpublished') return !review.isPublished;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container-custom">
        {error && <Alert type="error" message={error} />}
        {success && <Alert type="success" message={success} />}
        
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold mb-2">Review Management</h1>
          <p className="text-gray-600 dark:text-gray-400">{reviews.length} total reviews</p>
        </div>

        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-primary-500 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
          >
            All ({reviews.length})
          </button>
          <button
            onClick={() => setFilter('published')}
            className={`px-4 py-2 rounded-lg ${filter === 'published' ? 'bg-primary-500 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
          >
            Published ({reviews.filter(r => r.isPublished).length})
          </button>
          <button
            onClick={() => setFilter('unpublished')}
            className={`px-4 py-2 rounded-lg ${filter === 'unpublished' ? 'bg-primary-500 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
          >
            Unpublished ({reviews.filter(r => !r.isPublished).length})
          </button>
        </div>

        <div className="space-y-4">
          {filteredReviews.map(review => (
            <div key={review._id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              <div className="flex justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-lg">{review.title}</h3>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                    By {review.user?.name || 'Anonymous'} • {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                  {review.isVerifiedPurchase && (
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded">✓ Verified Purchase</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => togglePublish(review._id)}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      review.isPublished ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-300 text-gray-700 dark:text-gray-300 hover:bg-gray-400'
                    }`}
                  >
                    {review.isPublished ? 'Published' : 'Unpublished'}
                  </button>
                  <button
                    onClick={() => { setSelectedReview(review); setResponseText(review.adminResponse?.response || ''); setShowResponseModal(true); }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    <FiMessageSquare className="inline mr-1" /> {review.adminResponse ? 'Edit' : 'Respond'}
                  </button>
                  <button
                    onClick={() => deleteReview(review._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{review.comment}</p>
              
              {review.adminResponse && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
                  <p className="text-sm font-semibold text-blue-900 mb-1">Admin Response:</p>
                  <p className="text-sm text-blue-800">{review.adminResponse.response}</p>
                  <p className="text-xs text-blue-600 mt-2">
                    {new Date(review.adminResponse.respondedAt).toLocaleDateString()} by {review.adminResponse.respondedBy?.name || 'Admin'}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Response Modal */}
        {showResponseModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full">
              <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-2xl font-bold">Respond to Review</h2>
                <button onClick={() => { setShowResponseModal(false); setSelectedReview(null); setResponseText(''); }} className="text-gray-500 hover:text-gray-700 dark:text-gray-300">
                  <FiX size={24} />
                </button>
              </div>
              <div className="p-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
                  <p className="font-semibold mb-2">{selectedReview?.title}</p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{selectedReview?.comment}</p>
                </div>
                <label className="block text-sm font-medium mb-2">Your Response</label>
                <textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  className="input-field"
                  rows="4"
                  placeholder="Thank you for your feedback..."
                />
                <div className="flex gap-3 mt-4">
                  <button onClick={() => { setShowResponseModal(false); setSelectedReview(null); setResponseText(''); }} className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50">
                    Cancel
                  </button>
                  <button onClick={handleResponse} className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                    Submit Response
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReviews;

