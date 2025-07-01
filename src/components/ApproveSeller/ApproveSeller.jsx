import React, { useState } from 'react';
import axios from 'axios';
import { FaUserCheck } from 'react-icons/fa';

const ApproveSeller = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    restaurantId: '',
    name: '',
    phone: '',
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
          restaurantId: '',
          name: '',
          phone: '',
        });
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
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
          name="restaurantId"
          placeholder="Restaurant ID"
          value={formData.restaurantId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Restaurant Name"
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


        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#124734] text-white py-2 rounded hover:bg-green-700 transition"
        >
          {loading ? 'Approving...' : 'Approve Seller'}
        </button>

        {message && <p className="text-green-600 font-medium text-sm mt-2">{message}</p>}
        {error && <p className="text-red-600 font-medium text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default ApproveSeller;
