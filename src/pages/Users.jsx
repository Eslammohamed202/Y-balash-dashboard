'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEye, FaCommentDots, FaBan } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function UserManagement() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('users');
  const [filter, setFilter] = useState('all');
  const [sellerFilter, setSellerFilter] = useState('all');

  const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MWE3YThhNWQyZTQzM2Y5OWY4NTdjNiIsImlhdCI6MTc1MDI0ODc2OSwiZXhwIjoxNzUyODQwNzY5fQ.Wa_3TfrRp1NK5r_eTRHbZwOSpyb_ronnSqD-b_tGues';

  useEffect(() => {
    axios.get('https://y-balash.vercel.app/api/admin/users', {
      headers: { Authorization: TOKEN },
    }).then((res) => setUsers(res.data.users)).catch(console.error);

    axios.get('https://y-balash.vercel.app/api/admin/sellers', {
      headers: { Authorization: TOKEN },
    }).then((res) => setSellers(res.data.sellers)).catch(console.error);
  }, []);

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(search.toLowerCase()) &&
    (filter === 'active' ? user.status === 'active' : true)
  );

  const filteredSellers = sellers.filter(seller =>
    seller.email.toLowerCase().includes(search.toLowerCase()) &&
    (sellerFilter === 'active' ? seller.status === 'active' :
      sellerFilter === 'pending' ? seller.status === 'pending' :
      sellerFilter === 'suspended' ? seller.status === 'suspended' : true)
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-900">User & Seller Management</h1>
      <p className="text-gray-600 mb-6">Manage platform users and sellers efficiently</p>

      <div className="flex gap-4 border-b mb-4">
        <button className={`pb-2 font-semibold ${tab === 'users' ? 'border-b-2 border-[#1C573E]' : 'text-gray-600'}`} onClick={() => setTab('users')}>Users</button>
        <button className={`pb-2 font-semibold ${tab === 'sellers' ? 'border-b-2 border-red-500 text-red-600' : 'text-gray-600'}`} onClick={() => setTab('sellers')}>Sellers</button>
      </div>

      <div className="flex justify-between items-center mt-4 mb-2">
        <div className="flex gap-2">
          <button className={`px-3 py-1 border rounded ${filter === 'all' ? 'bg-[#1C573E] text-white' : ''}`} onClick={() => setFilter('all')}>All</button>
          <button className={`px-3 py-1 border rounded ${filter === 'active' ? 'bg-[#1C573E] text-white' : ''}`} onClick={() => setFilter('active')}>Active</button>
        </div>
        <input className="border px-2 py-1 rounded w-64" placeholder="Search users/sellers..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="p-4 border rounded bg-white">
        <div className="grid grid-cols-5 font-semibold border-b pb-2 text-gray-700">
          <span>{tab === 'users' ? 'User' : 'Store'}</span>
          <span>Email</span>
          <span>{tab === 'users' ? 'Join Date' : 'Phone'}</span>
          <span>{tab === 'users' ? 'Status' : 'Plan'}</span>
          <span className="text-center">Actions</span>
        </div>

        {(tab === 'users' ? filteredUsers : filteredSellers).slice(0, 10).map((item) => (
          <div key={item._id || item.id} className="grid grid-cols-5 items-center py-3 border-b text-sm">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/Cards')}>
              <img src={item.managedRestaurant?.imageUrl || "https://i.pravatar.cc/40"} alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
              <span className="text-gray-800 font-medium">{tab === 'users' ? `#${item.id?.slice(-5)}` : (item.managedRestaurant?.name || 'Unnamed')}</span>
            </div>
            <span>{item.email}</span>
            <span>{tab === 'users' ? new Date(item.joinDate).toDateString() : item.phone}</span>
            <span>{tab === 'users' ? item.status : item.plan}</span>
            <div className="flex justify-center space-x-3 text-lg text-gray-600">
              <FaEye className="cursor-pointer hover:text-blue-600" />
              <FaCommentDots className="cursor-pointer hover:text-yellow-500" />
              <FaBan className="cursor-pointer hover:text-red-500" />
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center pt-4 text-sm text-gray-500">
          <p>Showing 1 to 10 of {(tab === 'users' ? users.length : sellers.length)} entries</p>
          <div className="space-x-1">
            <button className="border px-2 py-1 rounded">Previous</button>
            <button className="px-3 py-1 bg-green-900 text-white rounded">1</button>
            <button className="border px-2 py-1 rounded">2</button>
            <button className="border px-2 py-1 rounded">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
