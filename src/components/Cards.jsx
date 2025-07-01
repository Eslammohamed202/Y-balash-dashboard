'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPhoneAlt, FaEnvelope, FaEdit, FaEye } from 'react-icons/fa';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

const TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MWE3YThhNWQyZTQzM2Y5OWY4NTdjNiIsImlhdCI6MTc1MDI0ODc2OSwiZXhwIjoxNzUyODQwNzY5fQ.Wa_3TfrRp1NK5r_eTRHbZwOSpyb_ronnSqD-b_tGues';

export default function SellerDetailsPage() {
  const router = useRouter();
  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({ totalOrders: 0, totalEarnings: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sellerRes, productsRes, statsRes] = await Promise.all([
          axios.get('https://y-balash.vercel.app/api/admin/sellers/6817f592ca31750074afbfb1', {
            headers: { Authorization: TOKEN },
          }),
          axios.get('https://y-balash.vercel.app/api/admin/seller/6768012ae385ce96f5a00a65/products', {
            headers: { Authorization: TOKEN },
          }),
          axios.get('https://y-balash.vercel.app/api/admin/total-earnings', {
            headers: { Authorization: TOKEN },
          }),
        ]);

        setSeller(sellerRes.data.seller);
        setProducts(productsRes.data.products);
        setStats({
          totalOrders: statsRes.data.totalOrders,
          totalEarnings: statsRes.data.totalEarnings,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  if (!seller) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">{seller.name}</h2>
          <p className="text-gray-600">{seller.isPremium ? 'Premium Seller' : 'Basic Seller'}</p>
          <Badge variant="success">{seller.status}</Badge>
          <div className="text-sm space-y-1 pt-2">
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-gray-500" /> {seller.email}
            </p>
            <p className="flex items-center gap-2">
              <FaPhoneAlt className="text-gray-500" /> {seller.phone}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded bg-red-500 text-white">Suspend Account</button>
          <button className="px-4 py-2 rounded bg-purple-500 text-white">Extend Subscription</button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 text-center">
        <div className="bg-white p-4 shadow rounded">
          <h4 className="text-sm text-gray-500">Total Products</h4>
          <p className="text-xl font-bold">{products.length}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h4 className="text-sm text-gray-500">Total Orders</h4>
          <p className="text-xl font-bold">{stats.totalOrders}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h4 className="text-sm text-gray-500">Total Earnings</h4>
          <p className="text-xl font-bold">{stats.totalEarnings} EGP</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h4 className="text-sm text-gray-500">Last Active</h4>
          <p className="text-xl font-bold">2h ago</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Store Products</h3>
          <input
            type="text"
            placeholder="Search products..."
            className="border p-2 rounded w-1/3"
          />
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-2">Product</th>
              <th className="p-2">Category</th>
              <th className="p-2">Price</th>
              <th className="p-2">Stock</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td className="p-2 text-center" colSpan="6">
                  No products available
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="p-2 flex items-center gap-2">
                    <img
                      src={product.image || '/default.png'}
                      alt={product.name}
                      className="w-10 h-10 rounded cursor-pointer"
                      onClick={() => router.push(`/product/${product.id}`)}
                    />
                    <div>
                      <div className="font-semibold">{product.name}</div>
                      <div className="text-xs text-gray-500">#{product.sku}</div>
                    </div>
                  </td>
                  <td className="p-2">{product.categoryName}</td>
                  <td className="p-2">{product.price} EGP</td>
                  <td className="p-2">{product.quantity}</td>
                  <td className="p-2">
                    <Badge variant="success">Active</Badge>
                  </td>
                  <td className="p-2 flex gap-2">
                    <FaEye
                      className="cursor-pointer text-blue-500"
                      onClick={() => router.push(`/product/${product.id}`)}
                    />
                    <FaEdit className="cursor-pointer text-green-500" />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
