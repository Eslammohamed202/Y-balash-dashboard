import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';

export default function Navbar({ setSearchTerm }) {
  const [input, setInput] = useState('');

  const handleInputChange = (event) => {
    setInput(event.target.value); // تحديث قيمة الإدخال المحلي
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setSearchTerm(input); // تمرير القيمة إلى searchTerm عند الضغط على Enter
    }
  };

  return (
    <div className="relative flex flex-col md:flex-row justify-between items-center px-4 md:px-6 py-4 bg-[#f2f4f7] shadow-lg rounded-xl gap-4 md:gap-0">
      <div className="w-full md:w-auto text-center md:text-left">
        <h2 className="text-lg font-medium text-gray-800"> Hello </h2> 
      </div>

      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
        <div className="relative w-[300px]">
          <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            id="desktop-search"
            name="search"
            placeholder="Search For Category"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md outline-none shadow-[0_2px_4px_rgba(0,0,0,0.05)] focus:ring-2 focus:ring-blue-300 bg-white text-gray-600 placeholder-gray-400"
          />
        </div>
      </div>

      <div className="flex md:hidden w-full items-center justify-between gap-4">
        <div className="relative w-full">
          <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            id="mobile-search"
            name="search"
            placeholder="Search For Category"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md outline-none shadow-[0_2px_4px_rgba(0,0,0,0.05)] focus:ring-2 focus:ring-blue-300 bg-white text-gray-600 placeholder-gray-400"
          />
        </div>
        <img
          src="https://i.pravatar.cc/40"
          alt="avatar"
          className="rounded-full w-10 h-10"
        />
      </div>

      <div className="hidden md:block">
        <img
          src="https://i.pravatar.cc/40"
          alt="avatar"
          className="rounded-full w-10 h-10"
        />
      </div>
    </div>
  );
}