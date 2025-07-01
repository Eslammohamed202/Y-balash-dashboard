import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCategories } from '../../lib/queries';

const Modal = ({ isOpen, onClose }) => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addCategories,
    onSuccess: () => {
      queryClient.invalidateQueries(['categories']);
      onClose();
      setCategoryName('');
      setCategoryDescription('');
      setCategoryImage(null);
      setImagePreview(null);
    },
    onError: (error) => {
      console.error('Error adding category:', error);
    },
  });

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategoryImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', categoryName);
    formData.append('description', categoryDescription);
    formData.append('image', categoryImage);

    mutation.mutate(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-6 w-[600px] relative" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-semibold mb-4">Add New Category</h2>

        <form onSubmit={handleSubmit}>
          {/* Image Upload */}
          <div className="mb-4">
            <label htmlFor="categoryImage" className="block font-medium mb-1">Category Image</label>
            <label className="w-full h-40 border-2 border-dashed rounded flex items-center justify-center cursor-pointer bg-gray-50">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="h-full object-contain" />
              ) : (
                <span className="text-gray-500">Drag and drop or browse</span>
              )}
              <input
                type="file"
                id="categoryImage"
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
                required
              />
            </label>
          </div>

          {/* Name */}
          <div className="mb-4">
            <label htmlFor="categoryName" className="block font-medium mb-1">Category Name</label>
            <input
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="categoryDescription" className="block font-medium mb-1">Category Description</label>
            <textarea
              id="categoryDescription"
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={mutation.isLoading}
            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
          >
            {mutation.isLoading ? 'Adding...' : 'Save Category'}
          </button>
        </form>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Modal;
