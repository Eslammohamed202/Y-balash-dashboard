'use client';

import React, { useState } from 'react';
import { RiUploadCloud2Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const ModelResturant = () => {
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState({
    name: '',
    description: '',
    location: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRestaurant((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB');
      return;
    }
    setRestaurant((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async () => {
    const { name, description, location, image } = restaurant;
    if (!name || !description || !location || !image) {
      alert('Please fill all fields and upload an image.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('location', location);
    formData.append('image', image);

    try {
      const res = await fetch('https://y-balash.vercel.app/api/restaurants/add', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MWE3YThhNWQyZTQzM2Y5OWY4NTdjNiIsImlhdCI6MTc1MDI0ODc2OSwiZXhwIjoxNzUyODQwNzY5fQ.Wa_3TfrRp1NK5r_eTRHbZwOSpyb_ronnSqD-b_tGues',
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Something went wrong');
        return;
      }

      alert('Restaurant added successfully');
      navigate('/restaurants');
    } catch (err) {
      console.error(err);
      alert('Error while adding restaurant');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f6f2] p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-semibold text-[#1C573E] mb-6">Add New Restaurant</h1>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Restaurant Image</label>
          <div className="border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center text-center">
            <RiUploadCloud2Line className="text-4xl text-gray-400" />
            <p className="text-gray-500">Drag and drop your images here, or <span className="text-green-700 font-medium">browse files</span></p>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="file-upload" />
            <label htmlFor="file-upload" className="mt-2 cursor-pointer text-green-700">Browse Files</label>
            <p className="text-xs text-gray-400 mt-1">Maximum file size: 5MB | Formats: JPG, PNG</p>
          </div>
          {restaurant.image && (
            <img src={URL.createObjectURL(restaurant.image)} alt="preview" className="w-32 h-32 object-cover rounded mt-4" />
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Restaurant Name</label>
            <input
              name="name"
              value={restaurant.name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Enter Restaurant name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Restaurant Description</label>
            <textarea
              name="description"
              value={restaurant.description}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded h-24"
              placeholder="Describe the Restaurant..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Restaurant Location</label>
            <input
              name="location"
              value={restaurant.location}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Enter Restaurant Location"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button onClick={() => router.back()} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-green-700 text-white rounded">Save Restaurant</button>
        </div>
      </div>
    </div>
  );
};

export default ModelResturant;