import React, { useState } from 'react';
import axios from 'axios';
import { FaUserCheck } from 'react-icons/fa';

const ApproveSeller = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    restaurantName: '',
    name: '',
    phone: '',
    additionalNotes: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const res = await axios.post('https://y-balash.vercel.app/api/admin/approve-seller', formData);
      
      if (res.data.success) {
        setMessage(res.data.message);
        setFormData({
          email: '',
          password: '',
          restaurantName: '',
          name: '',
          phone: '',
          additionalNotes: ''
        });
      } else {
        setError(res.data.message || 'Failed to approve seller');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <div className="flex items-center gap-3 mb-6">
        <FaUserCheck className="text-[#124734] text-2xl" />
        <h2 className="text-2xl font-bold text-gray-800">Approve Seller</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Seller Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="restaurantName"
          placeholder="Restaurant Name"
          value={formData.restaurantName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Seller Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="additionalNotes"
          placeholder="Additional Notes"
          value={formData.additionalNotes}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows="3"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#124734] text-white py-2 rounded hover:bg-green-700 transition"
        >
          {loading ? 'Approving...' : 'Approve Seller'}
        </button>

        {message && (
          <div className="p-3 bg-green-100 text-green-700 rounded mt-3">
            <p className="font-medium">{message}</p>
            {formData.email && (
              <p className="text-sm mt-1">Seller Email: {formData.email}</p>
            )}
          </div>
        )}
        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded mt-3">
            <p className="font-medium">{error}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default ApproveSeller;