import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MWE3YThhNWQyZTQzM2Y5OWY4NTdjNiIsImlhdCI6MTc1MDI0ODc2OSwiZXhwIjoxNzUyODQwNzY5fQ.Wa_3TfrRp1NK5r_eTRHbZwOSpyb_ronnSqD-b_tGues';

const SellerRequests = () => {
  const [approvedSellers, setApprovedSellers] = useState([]);
  const [rejectedSellers, setRejectedSellers] = useState([]);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const [approvedRes, rejectedRes] = await Promise.all([
          axios.get('https://y-balash.vercel.app/api/admin/approved-sellers', {
            headers: {
              Authorization: TOKEN,
            },
          }),
          axios.get('https://y-balash.vercel.app/api/admin/rejected-sellers', {
            headers: {
              Authorization: TOKEN,
            },
          }),
        ]);
        setApprovedSellers(approvedRes.data.approvedSellers);
        setRejectedSellers(rejectedRes.data.rejectedSellers);
      } catch (err) {
        console.error('Error fetching sellers:', err);
      }
    };

    fetchSellers();
  }, []);

  return (
    <div className="min-h-screen bg-[#f4efe5] p-4">
      <div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-4">
        <h1 className="text-xl font-bold text-green-900 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-green-900"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5V8.25M21 16.5V8.25M3 12h18"
            />
          </svg>
          Seller Management
        </h1>
        <div className="flex items-center gap-2">
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg"
            className="w-8 h-8 rounded-full"
            alt="Admin"
          />
          <span className="text-sm font-medium text-gray-700">Admin</span>
        </div>
      </div>

      <div className="bg-[#e9e6d8] rounded-lg p-6">
        <h2 className="text-lg font-semibold text-green-900 mb-3">Seller Join Requests</h2>
        <div className="bg-[#c4d1b2] text-sm text-green-900 p-3 rounded mb-6">
          ⚠️ New requests will appear here. Generate and send unique seller codes to approve requests.
        </div>

        <div className="space-y-4">
          {rejectedSellers.map((seller) => (
            <div key={seller._id} className="bg-white p-4 rounded shadow">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold text-md text-green-900">{seller.email.split('@')[0]}</h3>
                  <p className="text-sm text-gray-600">Applied on {new Date(seller.rejectedAt).toLocaleDateString()}</p>
                </div>
                <span className="text-red-500 font-medium bg-red-100 px-2 py-1 rounded text-sm">Rejected</span>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-800">
                  <span className="font-semibold">Email</span>: {seller.email}
                </p>
                <p className="text-sm text-gray-800">
                  <span className="font-semibold">Message</span>: {seller.reason}
                </p>
              </div>
            </div>
          ))}

          {approvedSellers.map((seller) => (
            <div key={seller._id} className="bg-white p-4 rounded shadow">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold text-md text-green-900">{seller.email.split('@')[0]}</h3>
                  <p className="text-sm text-gray-600">Applied on {new Date(seller.approvedAt).toLocaleDateString()}</p>
                </div>
                <span className="text-green-600 font-medium bg-green-100 px-2 py-1 rounded text-sm">Approved</span>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-800">
                  <span className="font-semibold">Email</span>: {seller.email}
                </p>
                <p className="text-sm text-gray-800">
                  <span className="font-semibold">Message</span>: {seller.additionalNotes || 'Looking to expand business.'}
                </p>
                <div className="bg-gray-100 p-3 rounded space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Brand ID</span>
                    <span className="text-gray-900 font-medium">#{seller.restaurantId?._id?.slice(-6)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Seller Brand Name</span>
                    <span className="text-gray-900 font-medium">{seller.restaurantId?.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Seller Password</span>
                    <span className="text-gray-900 font-medium">SELLER-2025-{seller.email.split('@')[0].toUpperCase().slice(0, 4)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerRequests;
