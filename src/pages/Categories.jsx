import React, { useState } from 'react';
import { useQueries } from '@tanstack/react-query';
import { getCategories } from '../lib/queries';
import Navbar from '../components/Navbar';
import Modal from '../components/categories/modal';

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [{ data: categories = [], isLoading, isError, error }] = useQueries({
    queries: [
      {
        queryKey: ['categories', searchTerm],
        queryFn: () => getCategories(searchTerm),
      },
    ],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFormSubmit = ({ categoryName, categoryDescription, categoryImage }) => {
    console.log('Category Name:', categoryName);
    console.log('Category Description:', categoryDescription);
    console.log('Category Image:', categoryImage);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (

    <div>
      <Navbar setSearchTerm={setSearchTerm} />
      <div className="container p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* صندوق إضافة فئة جديدة */}
          <div
            className="bg-white rounded-lg p-4 border-2 border-dashed border-gray-300 hover:shadow-lg transition-shadow flex flex-col items-center justify-center min-h-[100px] cursor-pointer"
            onClick={openModal}
          >
            <div className="text-4xl text-gray-400 mb-2">+</div>
            <p className="text-gray-500 font-medium">Add New Category</p>
          </div>

          {categories.map((category) => (
            <div
              key={category._id}
              className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow min-h-36"
            >
              <div className="flex flex-col justify-between min-h-32">
                <div className="text-left mb-3">
                  <h2 className="text-lg font-semibold">{category.name}</h2>
                  <p className="text-gray-600">
                    <span className="font-bold">{category.items.length} Items</span>
                  </p>
                </div>

                {/* الصورة في الأسفل على اليمين */}
                <div className="flex justify-end mt-auto">
                  <img
                    src={category.imageUrl || '/fruits.png'}
                    alt={category.name}
                    className="w-20 h-16 object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* مودال إضافة فئة جديدة */}
        <Modal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleFormSubmit} />
      </div>
    </div>

  );
};

export default Categories;
